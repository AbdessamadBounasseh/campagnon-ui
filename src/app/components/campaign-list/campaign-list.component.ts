import {Component, inject, OnInit} from '@angular/core';
import {CampaignService} from "../../services/campaign.service";
import {CampaignResponse} from "../../models/CampaignResponse";
import {Observable} from "rxjs";
import {AsyncPipe, CurrencyPipe, UpperCasePipe} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {CampaignCardComponent} from "../campaign-card/campaign-card.component";

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    UpperCasePipe,
    NzCardModule,
    CampaignCardComponent
  ],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css'
})
export class CampaignListComponent implements OnInit {
  campaignService = inject(CampaignService);

  campaigns!: Observable<CampaignResponse[]>;

  ngOnInit(): void {
    this.campaigns = this.campaignService.getAllCampaigns();
  }
}
