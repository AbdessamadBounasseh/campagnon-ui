import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NzListComponent,
  NzListItemActionComponent,
  NzListItemComponent,
  NzListItemMetaComponent
} from "ng-zorro-antd/list";
import {NzSkeletonComponent} from "ng-zorro-antd/skeleton";
import {NgForOf} from "@angular/common";
import {CampaignService} from "../../services/campaign.service";
import {CampaignResponse} from "../../models/CampaignResponse";

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css'
})
export class CampaignListComponent implements OnInit {
  campaigns: CampaignResponse[] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignService.getAllCampaigns().subscribe({
      next: (list: CampaignResponse[]) => this.campaigns = list,
      error: err => console.log(err)
    });
  }
}
