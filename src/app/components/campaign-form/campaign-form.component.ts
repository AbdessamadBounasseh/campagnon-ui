import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CampaignRequest} from "../../models/CampaignRequest";
import {CampaignService} from "../../services/campaign.service";
import {CampaignResponse} from "../../models/CampaignResponse";
import {log} from "ng-zorro-antd/core/logger";
import {Campaign} from "../../models/Campaign";
import {AsyncPipe, NgClass} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {ActivatedRoute, ROUTES} from "@angular/router";
import {Observable} from "rxjs";
import {HttpResponsePayload} from "../../payloads/HttpResponsePayload";

@Component({
  selector: 'app-campaign-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NgClass,
    NzInputDirective,
    AsyncPipe
  ],
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.css'
})
export class CampaignFormComponent implements OnInit {
  campaignFormGroup!: FormGroup;
  isAddForm: boolean = true;
  campaignName!: string;

  campaignService = inject(CampaignService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.campaignName = this.route.snapshot.params['name'];
    this.isAddForm = !this.campaignName;

    this.initForm();
  }

  initForm(): void {
    this.campaignFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      target: [Validators.required, Validators.min(10)]
    })

    if (!this.isAddForm) {
      this.campaignService.getCampaignByName(this.campaignName).subscribe({
        next: (campaign: CampaignResponse) => this.campaignFormGroup.patchValue(campaign),
        error: (err: HttpResponsePayload) => console.log(err.message)
      });
    }
  }

  submit() {
    if (this.isAddForm) {
      this.campaignService.createNewCampaign(this.campaignFormGroup.value).subscribe({
        next: (res: HttpResponsePayload) => console.log(res.message),
        error: err => console.log(err)
      });
    } else {
      this.campaignService.updateCampaign(this.campaignName, this.campaignFormGroup.value).subscribe({
        next: () => console.log('Campaign updated successfully !'),
        error: (err: HttpResponsePayload) => console.log(err.message)
      });
    }

  }
}
