import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private serviceRoot: string = 'https://localhost:5001/api/account';
  private curreUserSource: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.curreUserSource.asObservable();

  constructor(private http: HttpClient) {}

  public login(model: any): Observable<any> {
    return this.http.post<IUser>(`${this.serviceRoot}/login`, model).pipe(
      map((res: IUser) => {
        const user: IUser = res;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.curreUserSource.next(user);
        }
      })
    );
  }

  public register(model: any): Observable<any> {
    return this.http.post<IUser>(`${this.serviceRoot}/register`, model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.curreUserSource.next(user);
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.curreUserSource.next(null);
  }

  public setCurrentUser(user: IUser): void {
    this.curreUserSource.next(user);
  }
}
