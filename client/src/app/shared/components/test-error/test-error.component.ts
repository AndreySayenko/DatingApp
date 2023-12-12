import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent {
  private baseUrl: string = 'https://localhost:5001/api';

  constructor(private http: HttpClient) {}

  public get404Error() {
    this.http.get(`${this.baseUrl}/buggy/not-found`).subscribe({
      next: (res: any) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  public get400Error() {
    this.http.get(`${this.baseUrl}/buggy/bad-request`).subscribe({
      next: (res: any) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  public get500Error() {
    this.http.get(`${this.baseUrl}/buggy/server-error`).subscribe({
      next: (res: any) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  public get401Error() {
    this.http.get(`${this.baseUrl}/buggy/auth`).subscribe({
      next: (res: any) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  public get400ValidationError() {
    this.http.get(`${this.baseUrl}/account/register`).subscribe({
      next: (res: any) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
