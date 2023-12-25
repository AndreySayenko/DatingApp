import { Member } from 'src/app/shared/models';
import { MembersService } from './../../shared/service/members.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  public members$: Observable<Member[]> | undefined;

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.members$ = this.membersService.getMembers();
  }
}
