import { CommonModule } from '@angular/common';
import { MembersService } from 'src/app/shared/service/members.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryComponent, GalleryItem } from '@daelmaak/ngx-gallery';
import { Member } from 'src/app/shared/models';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  imports: [CommonModule, TabsModule, TimeagoModule, GalleryComponent],
})
export class MemberDetailComponent implements OnInit {
  public member: Member | undefined;
  public images: GalleryItem[] = [];

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute
  ) {
    this.membersService = inject(MembersService);
    this.route = inject(ActivatedRoute);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  private loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;

    this.membersService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        this.getImages();
      },
    });
  }

  private getImages(): void {
    if (!this.member) return;

    for (const photo of this.member?.photos) {
      this.images.push({ src: photo.url, thumbSrc: photo.url });
    }
  }
}
