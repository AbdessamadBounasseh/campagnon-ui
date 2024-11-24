import {Component, OnInit} from '@angular/core';
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
