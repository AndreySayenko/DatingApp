import { AccountService } from './../shared/service/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  public model: any = {};

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  public register(): void {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (err) => console.log(err),
    });
  }

  public cancel(): void {
    this.cancelRegister.emit(false);
  }
}
