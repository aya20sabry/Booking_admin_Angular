import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services/user.service';

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  description: string;
  rating: number;
  imageUrl: string;
  isOwner: boolean;
  propertiesCount?: number;
  bookingsCount?: number;
  isBlocked?: boolean;
}

@Component({
  selector: 'app-users-list-control',
  templateUrl: './users-list-control.component.html',
  styleUrls: ['./users-list-control.component.css']
})
export class UsersListControlComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.updatePaginatedUsers();
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  blockUser(userId: number) {
    this.userService.blockUser(userId).subscribe(
      () => {
        console.log(`User ${userId} blocked successfully`);
        // Update the user's status in the local array
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex].isBlocked = true;
          this.updatePaginatedUsers();
        }
      },
      (error) => {
        console.error(`Error blocking user ${userId}:`, error);
      }
    );
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log(`User ${userId} deleted successfully`);
        // Remove the user from the local array
        this.users = this.users.filter(user => user.id !== userId);
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.updatePaginatedUsers();
      },
      (error) => {
        console.error(`Error deleting user ${userId}:`, error);
      }
    );
  }
}