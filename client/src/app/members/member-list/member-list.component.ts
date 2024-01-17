import { Component, OnInit } from '@angular/core';
import { Member, Pagination, User } from 'src/app/shared/models';
import { UserParams } from 'src/app/shared/models/userParams.model';
import { MembersService } from 'src/app/shared/service/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  public members: Member[] = [];
  public pagination: Pagination | undefined;
  public userParams: UserParams | undefined;
  public genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(private membersService: MembersService) {
    this.userParams = this.membersService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  public loadMembers(): void {
    if (this.userParams) {
      this.membersService.setUserParams(this.userParams);
      this.membersService.getMembers(this.userParams).subscribe({
        next: (res) => {
          if (res.result && res.pagination) {
            this.members = res.result;
            this.pagination = res.pagination;
          }
        },
      });
    }
  }

  public pageChanged(e: any): void {
    if (this.userParams && this.userParams?.pageNumber !== e.page) {
      this.userParams.pageNumber = e.page;
      this.membersService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }

  public resetFilters(): void {
    this.userParams = this.membersService.resetUserParams();
    this.loadMembers();
  }
}
