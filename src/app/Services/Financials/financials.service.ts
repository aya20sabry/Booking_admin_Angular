import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FinancialsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getFinancials() {
    return this.http.get<any>(`${this.apiUrl}/bookingFinancials`);
  }
}
