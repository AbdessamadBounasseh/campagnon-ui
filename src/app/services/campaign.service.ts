import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CampaignResponse} from "../models/CampaignResponse";
import {CampaignRequest} from "../models/CampaignRequest";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  http = inject(HttpClient);

  getAllCampaigns(): Observable<CampaignResponse[]> {
    return this.http.get<CampaignResponse[]>('http://localhost:8081/api/v1/campaigns');
  }

  createNewCampaign(campaignRequest: CampaignRequest): Observable<Map<string, string>> {
    return this.http.post<Map<string, string>>('http://localhost:8081/api/v1/campaigns', campaignRequest);
  }
}
