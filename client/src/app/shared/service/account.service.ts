import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private serviceRoot: string = `${environment.apiUrl}account`;
  private curreUserSource: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public currentUser$ = this.curreUserSource.asObservable();

  constructor(private http: HttpClient) {}

  public login(model: any): Observable<any> {
    return this.http.post<User>(`${this.serviceRoot}/login`, model).pipe(
      map((res: User) => {
        const user: User = res;

        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  public register(model: any): Observable<any> {
    return this.http.post<User>(`${this.serviceRoot}/register`, model).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.curreUserSource.next(null);
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.curreUserSource.next(user);
  }
}
