import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentApiService, Apartment } from '../../Services/apartment-api.service';

@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apartmentApiService: ApartmentApiService) {}

  ngOnInit(): void {
    this.fetchApartments();
  }

  fetchApartments(): void {
    this.apartmentApiService.getAllApartments().subscribe({
      next: (data: Apartment[]) => {
        this.apartments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load apartments. Please try again later.';
        this.loading = false;
        console.error('Error loading apartments:', err);
      }
    });
  }

 
  trackByApartmentId(index: number, apartment: Apartment): string {
    return apartment._id;
  }

  deleteApartment(id: string): void {
    this.apartmentApiService.deleteApartment(id).subscribe({
      next: () => {
        this.apartments = this.apartments.filter(apartment => apartment._id !== id);
      },
      error: (err) => {
        console.error('Error deleting apartment:', err);
        alert('Failed to delete apartment. Please try again.');
      }
    });
  }

  getApprovedFacilities(apartment: Apartment): string[] {
    return Object.keys(apartment.facilities || {}).filter(key => apartment.facilities[key] === true);
  }
}
