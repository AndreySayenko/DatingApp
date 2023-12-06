import { AccountService } from './shared/service/account.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from './shared/models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DatingApp';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  public setCurrentUser(): void {
    const userString: any = localStorage.getItem('user');
    if (!userString) return;
    const user: IUser = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
