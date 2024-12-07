import {Component, inject, OnInit} from '@angular/core';
import {CampaignService} from "../../services/campaign.service";
import {CampaignResponse} from "../../models/CampaignResponse";
import {map, Observable} from "rxjs";
import {AsyncPipe, CurrencyPipe, NgIf, UpperCasePipe} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {CampaignCardComponent} from "../campaign-card/campaign-card.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {NzEmptyComponent} from "ng-zorro-antd/empty";

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    UpperCasePipe,
    NzCardModule,
    CampaignCardComponent,
    ConfirmDialogComponent,
    NgIf,
    NzEmptyComponent
  ],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css'
})
export class CampaignListComponent implements OnInit {
  campaignService = inject(CampaignService);

  campaigns!: Observable<CampaignResponse[]>;
  isModalOpen: boolean = false;
  processingCampaignName!: string;

  ngOnInit(): void {
    this.loadCampaigns();
  }

  private loadCampaigns() {
    this.campaigns = this.campaignService.getAllCampaigns();
  }

  showModal(campaignName: string) {
    this.isModalOpen = true;
    this.processingCampaignName = campaignName;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleDeletion($event: boolean) {
    if ($event) {
      this.closeModal();
      this.deleteCampaign(this.processingCampaignName);
      return;
    }
    this.closeModal();
  }

  private deleteCampaign(processingCampaignName: string) {
    this.campaignService.deleteCampaign(processingCampaignName).subscribe({
      next: () => {
        console.log('Campaign deleted successfully.');
        this.loadCampaigns();
        /*this.campaigns = this.campaigns.pipe(
          map(campaigns =>
            campaigns.filter(campaign =>
              campaign.name !== processingCampaignName
            )
          )
        )*/
      },
      error: () => console.log('Failed to delete campaign !')
    })
  }
}
