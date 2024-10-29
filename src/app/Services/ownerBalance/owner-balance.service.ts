import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.development';

export interface OwnerBalance {
  _id: string;
  owner_id: string;
  current_balance: number;
  total_paid: number;
  total_earned: number;
}

@Injectable({
  providedIn: 'root',
})
export class OwnerBalanceService {
  private apiUrl = `${environment.apiUrl}/ownerBalance`;

  constructor(private http: HttpClient) {}

  getAllBalances(): Observable<OwnerBalance[]> {
    return this.http.get<OwnerBalance[]>(this.apiUrl);
  }

  updateBalance(
    ownerId: string,
    data: { current_balance: number; total_paid: number }
  ): Observable<OwnerBalance> {
    return this.http.patch<OwnerBalance>(`${this.apiUrl}/${ownerId}`, data);
  }
}
