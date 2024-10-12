import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserApiService } from '../../Services/user-api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list-control.component.html',
  styleUrls: ['./users-list-control.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private userApiService: UserApiService) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    console.log('Fetched users:', this.users);

    this.loading = true;
    this.error = null;
    this.userApiService.getAllUsers().subscribe(
      (data) => {
        console.log('Fetched users:', data);
        this.users = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.error = 'Failed to fetch users. Please try again.';
        this.loading = false;
      }
    );
  }

  refreshUsers(): void {
    this.fetchAllUsers();
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userApiService.deleteUser(id).subscribe(
        () => {
          console.log('User deleted successfully');
          this.fetchAllUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
        }
      );
    }
  }

  toggleBlockUser(id: string, currentStatus: boolean): void {
    const blockStatus = !currentStatus;
    this.userApiService.blockUser(id, blockStatus).subscribe(
      () => {
        console.log('User block status updated successfully');
        this.fetchAllUsers();
      },
      (error) => {
        console.error('Error updating block status:', error);
        alert('Failed to update user block status. Please try again.');
      }
    );
  }

  trackByUserId(index: number, user: any): string {
    return user._id;
  }
}