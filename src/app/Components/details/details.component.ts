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
      this.loadHosts();
    });
  }

  loadHosts() {
    this.HostApi.getAllHosts().subscribe({
      next: (hosts) => {
        this.Host = hosts;
      },
      error: (err) => {
        console.error('Error loading hosts:', err);
      },
    });
  }

  toggleApproval(hostId: string): void {
    const host = this.Host.find((h) => h._id === hostId);
    if (host) {
      const newApprovalStatus = !host.approved;
      this.HostApi.updateHostApproval(hostId, newApprovalStatus).subscribe({
        next: (response) => {
          host.approved = newApprovalStatus; // Update local state
          console.log(
            `Host approval updated. ID: ${hostId}, Status: ${newApprovalStatus}`
          );
        },
        error: (err) => {
          console.error('Error updating approval status:', err);
        },
      });
    }
  }
}
