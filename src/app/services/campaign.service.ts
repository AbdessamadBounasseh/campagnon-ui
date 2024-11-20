import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CampaignResponse} from "../models/CampaignResponse";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  http = inject(HttpClient);

  getAllCampaigns(): Observable<CampaignResponse[]> {
    return this.http.get<CampaignResponse[]>('http://localhost:8081/api/v1/campaigns');
  }
}
