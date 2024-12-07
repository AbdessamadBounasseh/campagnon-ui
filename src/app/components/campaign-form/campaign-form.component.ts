import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CampaignService} from "../../services/campaign.service";
import {CampaignResponse} from "../../models/CampaignResponse";
import {AsyncPipe, NgClass} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponsePayload} from "../../payloads/HttpResponsePayload";
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-campaign-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NgClass,
    NzInputDirective,
    AsyncPipe,
    NzButtonModule
  ],
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.css'
})
export class CampaignFormComponent implements OnInit {
  campaignFormGroup!: FormGroup;
  isAddForm: boolean = true;
  campaignName!: string;
  loadingMessageId!: string;

  campaignService = inject(CampaignService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  messageService = inject(NzMessageService);

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
    this.createBasicMessage();
    if (this.isAddForm) {
      this.campaignService.createNewCampaign(this.campaignFormGroup.value).subscribe({
        next: () => this.messageService.success('Campaign created successfully !'),
        error: () => {
          this.messageService.error('Failed to create campaign !');
          this.messageService.remove(this.loadingMessageId);
        },
        complete: () => {
          this.messageService.remove(this.loadingMessageId);
          this.router.navigate(['campaigns']);
        }
      });
    } else {
      this.campaignService.updateCampaign(this.campaignName, this.campaignFormGroup.value).subscribe({
        next: () => this.messageService.success('Campaign updated successfully !'),
        error: () => {
          this.messageService.error('Failed to update campaign !');
          this.messageService.remove(this.loadingMessageId);
        },
        complete: () => {
          this.messageService.remove(this.loadingMessageId);
          this.router.navigate(['campaigns']);
        }
      });
    }
  }

  createBasicMessage(): void {
    this.loadingMessageId = this.messageService.loading(
      this.isAddForm ? 'Creation in progress...' : 'Update in progress...',
      {nzDuration: 0}
    ).messageId;
  }
}
