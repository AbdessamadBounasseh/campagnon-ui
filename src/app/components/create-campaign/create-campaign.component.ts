import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CampaignRequest} from "../../models/CampaignRequest";
import {CampaignService} from "../../services/campaign.service";
import {CampaignResponse} from "../../models/CampaignResponse";
import {log} from "ng-zorro-antd/core/logger";
import {Campaign} from "../../models/Campaign";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.css'
})
export class CreateCampaignComponent implements OnInit {
  campaignFormGroup!: FormGroup;

  campaignService = inject(CampaignService);
  formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.campaignFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      target: [Validators.required, Validators.min(10)]
    })
  }

  submit() {
    this.campaignService.createNewCampaign(this.campaignFormGroup.value).subscribe({
      next: (message: Map<string, string>) => console.log(message),
      error: err => console.log(err)
    });
  }
}
