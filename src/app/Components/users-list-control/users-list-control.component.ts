import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../../Services/user-api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list-control.component.html',
  styleUrls: ['./users-list-control.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  userToDelete: any = null;

  constructor(private userApiService: UserApiService) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  toggleUserInfo(user: any): void {
    user.showAllInfo = !user.showAllInfo;
  }

  fetchAllUsers(): void {
    this.loading = true;
    this.error = null;
    this.userApiService.getAllUsers().subscribe(
      (data) => {
        console.log('Fetched users:', data);
        this.users = data.map(user => ({
          ...user,
          newRole: user.role
        }));
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
    this.users = this.users.map(user => ({
      ...user,
      showAllInfo: false
    }));
  }

  deleteUser(user: any): void {
    this.userToDelete = user;
  }

  confirmDelete(): void {
    if (this.userToDelete) {
      this.userApiService.deleteUser(this.userToDelete._id).subscribe(
        () => {
          console.log('User deleted successfully');
          this.fetchAllUsers();
          this.userToDelete = null;
        },
        (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
          this.userToDelete = null;
        }
      );
    }
  }

  cancelDelete(): void {
    this.userToDelete = null;
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

  updateUserRole(user: any): void {
    if (user.newRole && user.newRole !== user.role) {
      this.userApiService.updateUserRole(user._id, user.newRole).subscribe(
        () => {
          console.log('User role updated successfully');
          user.role = user.newRole;
          // Optionally, you can call fetchAllUsers() here if you want to refresh all users
        },
        (error) => {
          console.error('Error updating user role:', error);
          alert('Failed to update user role. Please try again.');
          user.newRole = user.role; // Reset the new role to the current role
        }
      );
    }
  }

  trackByUserId(index: number, user: any): string {
    return user._id;
  }
}