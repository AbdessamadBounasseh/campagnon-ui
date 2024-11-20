import {Campaign} from "./Campaign";

export interface CampaignRequest extends Campaign {
  restAmount: number;
  transactions: TransactionResponse[];
}
