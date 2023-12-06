import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public registerMode: boolean = false;
  public users: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('Request complete'),
    });
  }

  public registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  public cancelRegisterMode(event: boolean): void {
    this.registerMode = event;
  }
}
