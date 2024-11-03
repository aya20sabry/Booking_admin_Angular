// import { Component, OnInit } from '@angular/core';
// import { HostApiService } from '../../Services/host-api.service';

// export interface  Host {
//   _id: string;
//   ownerId: string;
//   name: {
//     en: string;
//     ar: string;
//   };
//   subDescription: {
//     en: string;
//     ar: string;
//   };
//   description: {
//     en: string;
//     ar: string;
//   };
//   location: {
//     Address: {
//       en: string;
//       ar: string;
//     };
//     city: {
//       en: string;
//       ar: string;
//     };
//     country: {
//       en: string;
//       ar: string;
//     };
//   };
//   images: string[];
//   AverageRating: number;
//   ReviewCount: number;
//   approved: boolean;
//   PricePerNight: number;
//   CheckInTime: string;
//   CheckOutTime: string;
//   HouseRules: {
//     NoParties: boolean;
//     NoPets: boolean;
//     NoSmoking: boolean;
//     Cancellation: {
//       Policy: object;
//       Refundable: boolean;
//       DeadlineDays: number;
//     };
//   };
//   phone: string | number;
//   CreatedAt: string;
//   UpdatedAt: string;
// }
// @Component({
//   selector: 'app-hotels-list',
//   standalone: true,
//   imports: [],
//   templateUrl: './hotels-list.component.html',
//   styleUrl: './hotels-list.component.css'
// })

// export class HotelsListComponent implements OnInit{

//   constructor(private HostApi:HostApiService) { }

//   Host:any[]=[]

//   ngOnInit():void{

//     this.HostApi.getAllHosts().subscribe({
//       next:(host)=>{
//         this.Host=host
//        console.log( this.Host=host);

//       },
//       error:(err)=>{
//         console.log(err);

//       }

//     })

// }

// deleteHost(id:String): void {
//   this.HostApi.deleteHost(id).subscribe({

//     next: () => {
//       console.log('hotel deleted successfully');

//     },
//     error: (err) => {
//       console.error('Error deleting hotel:', err);
//     }
//   });
// }

//   }

import { Component, OnInit } from '@angular/core';
import { HostApiService } from '../../Services/host-api.service';

export interface Host {
  _id: string;
}

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css'],
})
export class HotelsListComponent implements OnInit {
  Host: any[] = [];

  constructor(private hostApi: HostApiService) {}

  ngOnInit(): void {
    this.hostApi.getAllHosts().subscribe({
      next: (hosts) => {
        this.Host = hosts;
        console.log('test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // deleteHost(id: string): void {
  //   this.hostApi.deleteHost(id).subscribe({
  //     next: () => {
  //       this.Host = this.Host.filter(host => host._id !== id);
  //       console.log('Hotel deleted successfully');
  //     },
  //     error: (err) => {
  //       console.error('Error deleting hotel:', err);
  //     }
  //   });
  // }

  deleteHost(id: string): void {
    console.log(id),
      this.hostApi.deleteHost(id).subscribe({
        next: () => {
          console.log('hotel deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting hotel:', err);
        },
      });
  }
}
