import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Apartment {
  _id: string;
  name: { en: string; ar: string };
  phone: string;
  location: {
    city: { en: string };
    country: { en: string };
  };
  images: string[];
  review: string[];
  facilities: { [key: string]: boolean };
  approved: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApartmentApiService {
  private apiUrl = 'http://localhost:3000/apartments';

  constructor(private http: HttpClient) {}

  // Fetch all apartments
  getAllApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apiUrl);
  }

  // Fetch apartment by ID
  getApartmentById(id: string): Observable<Apartment> {
    return this.http.get<Apartment>(`${this.apiUrl}/${id}`);
  }

  // Create a new apartment
  addApartment(apartmentData: Partial<Apartment>): Observable<Apartment> {
    return this.http.post<Apartment>(this.apiUrl, apartmentData);
  }

  // Update an existing apartment by ID
  updateApartment(
    id: string,
    apartmentData: Partial<Apartment>
  ): Observable<Apartment> {
    return this.http.put<Apartment>(`${this.apiUrl}/${id}`, apartmentData);
  }

  // Delete an apartment by ID
  deleteApartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
