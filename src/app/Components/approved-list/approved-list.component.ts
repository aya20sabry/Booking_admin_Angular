
import { Component, OnInit } from '@angular/core';
import { HostApiService } from '../../Services/host-api.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-apartment-list',
  imports: [RouterModule,CommonModule],
  templateUrl:'./approved-list.component.html',
  styleUrls: ['./approved-list.component.css']
})
export class ApprovedListComponent implements OnInit {
  hosts: any[] = [];
  filteredHosts: any[] = [];
  selectedFilter: string = 'all';

  constructor(private hostApi: HostApiService) {}

  ngOnInit() {
    this.loadHosts();
  }

  loadHosts() {
    this.hostApi.getAllHosts().subscribe(
      (data: any[]) => {
        console.log('Received data:', data);
        this.hosts = data;
        this.filterHosts();
      },
      (error) => {
        console.error('Error fetching hosts:', error);
      }
    );
  }

  filterHosts() {
    if (this.selectedFilter === 'approved') {
      this.filteredHosts = this.hosts.filter(host => host.approved === true);
    } else if (this.selectedFilter === 'not-approved') {
      this.filteredHosts = this.hosts.filter(host => host.approved === false);
    } else {
      this.filteredHosts = [...this.hosts];
    }
    console.log(this.filteredHosts);
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.target.value;
    this.filterHosts();
  }

  deleteHost(id: string): void {
    console.log('Deleting host with id:', id);

    this.hostApi.deleteHost(id).subscribe({
      next: () => {
        console.log('Host deleted successfully');
        // Remove the deleted host from both arrays
        this.hosts = this.hosts.filter(host => host._id !== id);
        this.filteredHosts = this.filteredHosts.filter(host => host._id !== id);
        console.log('Updated hosts:', this.hosts);
        console.log('Updated filtered hosts:', this.filteredHosts);
      },
      error: (err) => {
        console.error('Error deleting host:', err);
      }
    });
  }
}