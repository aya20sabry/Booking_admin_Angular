// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'https://api.example.com/users'; // Replace with your actual API endpoint

//   constructor(private http: HttpClient) {}

//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   blockUser(userId: number): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${userId}/block`, {});
//   }

//   deleteUser(userId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${userId}`);
//   }
// }


import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
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
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: "John Doe",
      age: 35,
      job: "Property Manager",
      description: "Experienced property owner with multiple listings.",
      rating: 4.8,
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      isOwner: true,
      propertiesCount: 5
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      job: "Real Estate Investor",
      description: "Passionate about providing great accommodation experiences.",
      rating: 4.6,
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      isOwner: true,
      propertiesCount: 3
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 42,
      job: "Hospitality Entrepreneur",
      description: "Dedicated to creating unique stays for guests.",
      rating: 4.9,
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      isOwner: true,
      propertiesCount: 7
    },
    {
      id: 4,
      name: "Emily Brown",
      age: 31,
      job: "Vacation Rental Host",
      description: "Loves meeting people from around the world.",
      rating: 4.7,
      imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      isOwner: true,
      propertiesCount: 2
    },
    {
      id: 5,
      name: "David Lee",
      age: 39,
      job: "Property Developer",
      description: "Specializes in luxury accommodations.",
      rating: 4.5,
      imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      isOwner: true,
      propertiesCount: 4
    },
    {
      id: 6,
      name: "Sarah Wilson",
      age: 26,
      job: "Marketing Executive",
      description: "Frequent traveler for both work and leisure.",
      rating: 4.2,
      imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      isOwner: false,
      bookingsCount: 8
    },
    {
      id: 7,
      name: "Tom Harris",
      age: 33,
      job: "Software Engineer",
      description: "Enjoys staying at unique properties during vacations.",
      rating: 4.4,
      imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      isOwner: false,
      bookingsCount: 5
    },
    {
      id: 8,
      name: "Lisa Chen",
      age: 29,
      job: "Freelance Photographer",
      description: "Always looking for picturesque locations to stay.",
      rating: 4.6,
      imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      isOwner: false,
      bookingsCount: 12
    },
    {
      id: 9,
      name: "Robert Taylor",
      age: 45,
      job: "Business Consultant",
      description: "Prefers comfortable stays during business trips.",
      rating: 4.1,
      imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
      isOwner: false,
      bookingsCount: 20
    },
    {
      id: 10,
      name: "Emma Davis",
      age: 24,
      job: "Graduate Student",
      description: "Loves exploring new cities and cultures.",
      rating: 4.3,
      imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
      isOwner: false,
      bookingsCount: 3
    }
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  blockUser(userId: number): Observable<any> {
    // Simulate API call
    return of({ success: true });
  }

  deleteUser(userId: number): Observable<any> {
    // Simulate API call and remove user from the array
    this.users = this.users.filter(user => user.id !== userId);
    return of({ success: true });
  }
}