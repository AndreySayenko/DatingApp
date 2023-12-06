import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public model: any = {};

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        console.log();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public logout(): void {
    this.accountService.logout();
  }
}
