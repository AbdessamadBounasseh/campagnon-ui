import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CurrencyPipe, UpperCasePipe} from "@angular/common";
import {NzCardComponent} from "ng-zorro-antd/card";
import {Campaign} from "../../models/Campaign";
import {CampaignResponse} from "../../models/CampaignResponse";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {RouterModule} from "@angular/router";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-campaign-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    NzCardComponent,
    UpperCasePipe,
    NzIconDirective,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    RouterModule,
    ConfirmDialogComponent
  ],
  templateUrl: './campaign-card.component.html',
  styleUrl: './campaign-card.component.css'
})
export class CampaignCardComponent {
  @Input() campaign!: CampaignResponse;
  @Output() toggleModal: EventEmitter<void> = new EventEmitter();

  showModal() {
    this.toggleModal.emit();
  }
}
