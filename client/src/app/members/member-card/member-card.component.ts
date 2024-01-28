import { MembersService } from 'src/app/shared/service/members.service';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  @Input() member!: Member;

  constructor(
    private membersService: MembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public addLike(member: Member): void {
    this.membersService.addLike(member.userName).subscribe({
      next: () => this.toastr.success(`You have liked ${member.knownAs}`),
    });
  }
}
