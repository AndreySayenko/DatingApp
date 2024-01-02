import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private serviceRoot: string = `${environment.apiUrl}users`;
  public members: Member[] = [];

  constructor(private http: HttpClient) {}

  public getMembers(): Observable<Member[]> {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(`${this.serviceRoot}`).pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }

  public getMember(username: string): Observable<Member> {
    const member: Member | undefined = this.members.find(
      (x) => x.userName === username
    );
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
}
