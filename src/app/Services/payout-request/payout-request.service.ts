import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.development';

export interface PayoutRequest {
  _id: string;
  owner_id: string;
  amount: number;
  payment_method: string;
  payment_reference: string;
  status: string;
  createdAt: Date;
  payment_date?: Date;
  isLoading?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PayoutRequestService {
  private apiUrl = `${environment.apiUrl}/payoutRequest`;

  constructor(private http: HttpClient) {}

  getAllPayoutRequests(): Observable<PayoutRequest[]> {
    return this.http.get<PayoutRequest[]>(this.apiUrl);
  }

  updatePayoutRequest(
    id: string,
    data: { status: string; payment_date: Date }
  ): Observable<PayoutRequest> {
    return this.http.patch<PayoutRequest>(`${this.apiUrl}/${id}`, data);
  }
}
