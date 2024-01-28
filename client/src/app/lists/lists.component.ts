import { MembersService } from 'src/app/shared/service/members.service';
import { Component, OnInit } from '@angular/core';
import { Member, Pagination } from '../shared/models';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  public members: Member[] | undefined;
  public predicate: string = 'liked';
  public pageNumber: number = 1;
  public pageSize: number = 5;
  public pagination: Pagination | undefined;

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  public loadLikes(): void {
    this.membersService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe({
        next: (res) => {
          this.members = res.result;
          this.pagination = res.pagination;
        },
      });
  }

  public pageChanged(e: any): void {
    if (this.pageNumber !== e.page) {
      this.pageNumber = e.page;
      this.loadLikes();
    }
  }
}
