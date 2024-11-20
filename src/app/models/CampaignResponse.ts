import {Campaign} from "./Campaign";
import {TransactionResponse} from "./TransactionResponse";

export interface CampaignResponse extends Campaign {
  restAmount: number;
  transactions: TransactionResponse[];
}
