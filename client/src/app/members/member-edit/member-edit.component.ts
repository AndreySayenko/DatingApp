import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MembersService } from './../../shared/service/members.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { User, Member } from 'src/app/shared/models';
import { AccountService } from 'src/app/shared/service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValie = true;
    }
  }
  public member: Member | undefined;
  public user!: User | null;

  constructor(
    private accountService: AccountService,
    private membersService: MembersService,
    private toastr: ToastrService
  ) {
    this,
      accountService.currentUser$.pipe(take(1)).subscribe({
        next: (user) => (this.user = user),
      });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  private loadMember(): void {
    if (!this.user) return;

    this.membersService.getMember(this.user.username).subscribe({
      next: (member) => (this.member = member),
    });
  }

  public updateMember(): void {
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      },
    });
  }
}
