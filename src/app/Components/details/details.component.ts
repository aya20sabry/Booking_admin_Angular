
// ======================
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostApiService } from '../../Services/host-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: string | null = null;
  Host: any[] = [];

  constructor(private route: ActivatedRoute, private HostApi: HostApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      console.log('ID', this.id);
    });

    this.loadHostData();
   
  }
 

  loadHostData(): void {
    this.HostApi.getAllHosts().subscribe({
      next: (hosts) => {
        this.Host = hosts;
        console.log('Data is:', this.Host);
      },
      error: (err) => {
        console.error('Error in fetching data', err);
      },
    });
  }

  toggleApproval(id: string): void {
    const host = this.Host.find((h) => h._id === id);
    if (host) {
      const newApprovalStatus = !host.approved;
      console.log('Approval status before change:', host.approved);
      console.log('New approval status:', newApprovalStatus);

      this.updateApprovalInDatabase(id, newApprovalStatus);
    }
  }

  updateApprovalInDatabase(id: string, approved: boolean): void {
    this.HostApi.updateHostApproval(id, approved).subscribe({
      next: (response) => {
        console.log(`Updated Host ID: ${id}, New approval status: ${approved}`);
        // Update the local data after successful API call
        const updatedHost = this.Host.find((h) => h._id === id);
        if (updatedHost) {
          updatedHost.approved = approved;
        }
      },
      error: (err) => {
        console.error('Error updating approval status', err);
      },
    });
  }
  
}