import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.development';

// Interface for the payout request payload
interface PayoutRequest {
  amount: number;
  paypalEmail: string;
  payoutRequestId: string;
}

// Interface for the batch header in the payout response
interface PayoutBatchHeader {
  payout_batch_id: string;
  batch_status: string;
  sender_batch_header: {
    sender_batch_id: string;
    email_subject: string;
  };
}

// Interface for payout items in the response
interface PayoutItem {
  payout_item_id: string;
  transaction_id: string;
  transaction_status: string;
  payout_item_fee: {
    currency: string;
    value: string;
  };
  payout_batch_id: string;
  recipient_type: string;
  amount: {
    currency: string;
    value: string;
  };
  receiver: string;
}

// Interface for the complete payout response
interface PayoutResponse {
  batch_header: PayoutBatchHeader;
  items: PayoutItem[];
}

// Interface for payout status response
interface PayoutStatusResponse {
  batch_header: PayoutBatchHeader;
  items: PayoutItem[];
}

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private apiUrl = `${environment.apiUrl}/paypal`;

  constructor(private http: HttpClient) {}

  /**
   * Creates a new payout
   * @param data The payout request data
   * @returns Observable of the payout response
   */
  createPayout(data: PayoutRequest): Observable<PayoutResponse> {
    return this.http.post<PayoutResponse>(`${this.apiUrl}/payout`, data);
  }

  /**
   * Gets the status of a payout batch
   * @param batchId The payout batch ID
   * @returns Observable of the payout status response
   */
  getPayoutStatus(batchId: string): Observable<PayoutStatusResponse> {
    return this.http.get<PayoutStatusResponse>(
      `${this.apiUrl}/payout-status/${batchId}`
    );
  }
}
