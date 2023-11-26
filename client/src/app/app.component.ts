import { Component, OnInit } from '@angular/core';
import { UsersService } from './shared/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DatingApp';
  public users: any[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('Request complete'),
    });
  }
}
