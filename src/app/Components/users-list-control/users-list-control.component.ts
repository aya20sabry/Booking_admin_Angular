import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  imageUrl: string;
  propertiesCount: number;
  propertyTypes: string;
  totalRating: number;
  isFavorite: boolean;
}

@Component({
  selector: 'app-users-list-control',
  templateUrl: './users-list-control.component.html',
  styleUrls: ['./users-list-control.component.css']
})
export class UsersListControlComponent implements OnInit {
  users: User[] = [];

  constructor() { }

  ngOnInit(): void {
    // Fetch users data from an API or service
    this.fetchUsers();
  }

  fetchUsers(): void {
    // TODO: Replace this with actual API call
    this.users = [
      {
        id: 1,
        name: 'John Doe',
        age: 35,
        job: 'Software Engineer',
        imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        propertiesCount: 2,
        propertyTypes: '1 Hotel, 1 Apartment',
        totalRating: 4.5,
        isFavorite: false
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 28,
        job: 'Marketing Manager',
        imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
        propertiesCount: 1,
        propertyTypes: '1 Apartment',
        totalRating: 4.2,
        isFavorite: true
      },
      {
        id: 3,
        name: 'Mike Johnson',
        age: 42,
        job: 'Real Estate Agent',
        imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
        propertiesCount: 5,
        propertyTypes: '2 Hotels, 3 Apartments',
        totalRating: 4.8,
        isFavorite: false
      },
      {
        id: 4,
        name: 'Emily Brown',
        age: 31,
        job: 'Architect',
        imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
        propertiesCount: 3,
        propertyTypes: '1 Hotel, 2 Apartments',
        totalRating: 4.6,
        isFavorite: true
      },
      {
        id: 5,
        name: 'David Lee',
        age: 39,
        job: 'Business Consultant',
        imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
        propertiesCount: 2,
        propertyTypes: '2 Hotels',
        totalRating: 4.3,
        isFavorite: false
      },
      {
        id: 6,
        name: 'Sarah Wilson',
        age: 33,
        job: 'Interior Designer',
        imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
        propertiesCount: 4,
        propertyTypes: '1 Hotel, 3 Apartments',
        totalRating: 4.7,
        isFavorite: true
      },
      {
        id: 7,
        name: 'Tom Anderson',
        age: 45,
        job: 'Property Manager',
        imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
        propertiesCount: 6,
        propertyTypes: '3 Hotels, 3 Apartments',
        totalRating: 4.9,
        isFavorite: false
      },
      {
        id: 8,
        name: 'Lisa Chen',
        age: 29,
        job: 'Financial Analyst',
        imageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
        propertiesCount: 1,
        propertyTypes: '1 Apartment',
        totalRating: 4.0,
        isFavorite: true
      },
      {
        id: 9,
        name: 'Robert Taylor',
        age: 37,
        job: 'Hotel Manager',
        imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
        propertiesCount: 3,
        propertyTypes: '2 Hotels, 1 Apartment',
        totalRating: 4.6,
        isFavorite: false
      },
      {
        id: 10,
        name: 'Emma Davis',
        age: 26,
        job: 'Travel Blogger',
        imageUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
        propertiesCount: 2,
        propertyTypes: '2 Apartments',
        totalRating: 4.4,
        isFavorite: true
      },
      {
        id: 11,
        name: 'Chris Martin',
        age: 41,
        job: 'Entrepreneur',
        imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
        propertiesCount: 4,
        propertyTypes: '1 Hotel, 3 Apartments',
        totalRating: 4.7,
        isFavorite: false
      },
      {
        id: 12,
        name: 'Olivia White',
        age: 32,
        job: 'Event Planner',
        imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
        propertiesCount: 2,
        propertyTypes: '2 Hotels',
        totalRating: 4.5,
        isFavorite: true
      },
      {
        id: 13,
        name: 'Daniel Kim',
        age: 36,
        job: 'Photographer',
        imageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        propertiesCount: 1,
        propertyTypes: '1 Apartment',
        totalRating: 4.2,
        isFavorite: false
      },
      {
        id: 14,
        name: 'Sophie Turner',
        age: 30,
        job: 'Yoga Instructor',
        imageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
        propertiesCount: 2,
        propertyTypes: '1 Hotel, 1 Apartment',
        totalRating: 4.8,
        isFavorite: true
      },
      {
        id: 15,
        name: 'Alex Rodriguez',
        age: 38,
        job: 'Investment Banker',
        imageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        propertiesCount: 3,
        propertyTypes: '1 Hotel, 2 Apartments',
        totalRating: 4.6,
        isFavorite: false
      }
    ];
  }
  deleteUser(userId: number): void {
    // TODO: Implement delete user functionality
    console.log(`Delete user with ID: ${userId}`);
  }

  blockUser(userId: number): void {
    // TODO: Implement block user functionality
    console.log(`Block user with ID: ${userId}`);
  }

  toggleFavorite(userId: number): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.isFavorite = !user.isFavorite;
      // TODO: Update favorite status on the server
    }
  }
}