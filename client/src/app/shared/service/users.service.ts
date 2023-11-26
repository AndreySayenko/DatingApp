import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private serviceRoot: string = 'https://localhost:5001/api/users';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http.get(`${this.serviceRoot}`);
  }

  public grtUser(id: number): Observable<any> {
    return this.http.get(`${this.serviceRoot}/${id}`);
  }
}
