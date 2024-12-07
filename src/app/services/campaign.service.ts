import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CampaignResponse} from "../models/CampaignResponse";
import {CampaignRequest} from "../models/CampaignRequest";
import {HttpResponsePayload} from "../payloads/HttpResponsePayload";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  http = inject(HttpClient);

  getAllCampaigns(): Observable<CampaignResponse[]> {
    return this.http.get<CampaignResponse[]>('http://localhost:8081/api/v1/campaigns');
  }

  getCampaignByName(name: string): Observable<CampaignResponse> {
    return this.http.get<CampaignResponse>(`http://localhost:8081/api/v1/campaigns/${name}`);
  }

  updateCampaign(name: string, campaignRequest: CampaignRequest): Observable<void> {
    return this.http.put<void>(`http://localhost:8081/api/v1/campaigns/${name}`, campaignRequest);
  }

  createNewCampaign(campaignRequest: CampaignRequest): Observable<HttpResponsePayload> {
    return this.http.post<HttpResponsePayload>('http://localhost:8081/api/v1/campaigns', campaignRequest);
  }

  deleteCampaign(campaignName: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8081/api/v1/campaigns/${campaignName}`);
  }
}
