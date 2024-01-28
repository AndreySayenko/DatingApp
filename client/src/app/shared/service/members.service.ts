import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member, PaginatedResult, User } from '../models';
import { Observable, map, of, take } from 'rxjs';
import { UserParams } from '../models/userParams.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private serviceRoot: string = `${environment.apiUrl}users`;
  private likeServiceRoot: string = `${environment.apiUrl}likes`;

  public members: Member[] = [];
  public memberCache = new Map();
  public user: User | undefined;
  public userParams: UserParams | undefined;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams): void {
    this.userParams = params;
  }

  resetUserParams() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  public getMembers(
    userParams: UserParams
  ): Observable<PaginatedResult<Member[]>> {
    const response = this.memberCache.get(Object.values(userParams).join('-'));

    if (response) return of(response);

    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(
      `${this.serviceRoot}`,
      params
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  public getMember(username: string): Observable<Member> {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

    if (member) return of(member);

    return this.http.get<Member>(`${this.serviceRoot}/${username}`);
  }

  public updateMember(member: Member): Observable<unknown> {
    return this.http.put(`${this.serviceRoot}`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }

  public setMainPhoto(photoId: number): Observable<unknown> {
    return this.http.put(`${this.serviceRoot}/set-main-photo/${photoId}`, {});
  }

  public deletePhoto(photoId: number): Observable<unknown> {
    return this.http.delete(`${this.serviceRoot}/delete-photo/${photoId}`);
  }

  public addLike(username: string): Observable<any> {
    return this.http.post<any>(`${this.likeServiceRoot}/${username}`, {});
  }

  public getLikes(
    predicate: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    let params = this.getPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    return this.getPaginatedResult<Member[]>(`${this.likeServiceRoot}`, params);
  }

  private getPaginatedResult<T>(
    url: string,
    params: HttpParams
  ): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return params;
  }
}
