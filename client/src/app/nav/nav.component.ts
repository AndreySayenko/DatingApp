import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: (_) => {
        this.router.navigateByUrl('/members');
      },
      error: (err) => {
        this.toastr.error(err.error);
        console.log(err);
      },
    });
  }

  public logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/ ');
  }
}
