// import { routes } from './../../app.routes';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-details',
//   standalone: true,
//   imports: [],
//   templateUrl: './details.component.html',
//   styleUrl: './details.component.css'
// })
// export class DetailsComponent {

// }
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HostApiService } from '../../Services/host-api.service';
// import { isBuiltin } from 'module';

// @Component({
//   selector: 'app-details',
//   templateUrl: './details.component.html',
//   styleUrls: ['./details.component.css']
// })
// export class DetailsComponent implements OnInit {
//   id: string | null = null;
//   router: any;
//   // onehost = {
//   //   approved:false
//   // };
//   isToggled: boolean = false;
//   constructor(private route: ActivatedRoute,private HostApi:HostApiService) {}
//   Host:any[]=[]
//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.id = params['id'];
//       console.log('ID', this.id);
//     });
//     this.HostApi.getAllHosts().subscribe({
//       next:(host)=>{

//         this.Host=host
//         console.log("test");
//         console.log(this.Host);

//         if (this.Host.approved== false) {
//           this.Host.approved = true;
//         }

//         this.isToggled =!this.isToggled;

//       },
//       error:(err)=>{
//         console.log(err);

//       }

//     })
//   }

//   // toggleApproval(): void {
//   //   this.onehost.approved = !this.onehost.approved;
//   // }
//   }

// 444444444444444444444444444444444444444

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HostApiService } from '../../Services/host-api.service';

// @Component({
//   selector: 'app-details',
//   templateUrl: './details.component.html',
//   styleUrls: ['./details.component.css']
// })
// export class DetailsComponent implements OnInit {
//   id: string | null = null;
//   isToggled: boolean = false;
//   Host: any[] = [];  // مصفوفة لاستقبال البيانات

//   constructor(private route: ActivatedRoute, private HostApi: HostApiService) {}

//   ngOnInit(): void {
//     // استلام الـ ID من الـ Query Params في الرابط
//     this.route.queryParams.subscribe(params => {
//       this.id = params['id'];
//       console.log('ID', this.id);
//     });

//     // جلب البيانات من الـ API
//     this.HostApi.getAllHosts().subscribe({
//       next: (hosts) => {
//         this.Host = hosts;
//         console.log('البيانات المستلمة:', this.Host);

//         // إذا كانت هناك خاصية approved في أحد العناصر ونريد تبديلها
//         // إذا كانت القيمة false، نقوم بتحويلها إلى true
//         const host = this.Host.find(h => h.id === this.id); // العثور على العنصر باستخدام الـ ID
//         if (host) {
//           if (host.approved === false) {
//             host.approved = true; // التبديل بين false و true
//           } else {
//             host.approved = false;
//           }
//         }

//         this.isToggled = !this.isToggled;  // التبديل بين true و false
//       },
//       error: (err) => {
//         console.error('حدث خطأ عند جلب البيانات:', err);
//       }
//     });
//   }

//   toggleApproval(id: string): void {
//     const host = this.Host.find(h => h.id === id);
//     if (host) {
//       host.approved = !host.approved;  // تبديل القيمة بين true و false
//     }
//   }
// }
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
  isToggled: boolean = false;
  Host: any[] = [];

  constructor(private route: ActivatedRoute, private HostApi: HostApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      console.log('ID', this.id);
    });

    this.HostApi.getAllHosts().subscribe({
      next: (hosts) => {
        this.Host = hosts;
        console.log(' data is:', this.Host);
        console.log(hosts);

        const host = this.Host.find((h) => h.id === this.id);
        if (host) {
          console.log('  data Before change:', host.approved);

          host.approved = !host.approved;
          console.log('data after changeب', host.approved);

          this.updateApprovalInDatabase(host.id, host.approved);
        }
      },
      error: (err) => {
        console.error('err in giving data', err);
      },
    });
  }

  toggleApproval(id: string): void {
    this.updateApprovalInDatabase(id, true);
  }

  updateApprovalInDatabase(id: string, approved: boolean): void {
    this.HostApi.updateHostApproval(id, approved).subscribe({
      next: (response) => {
        console.log(`ت done Host ID: ${id}`);
      },
      error: (err) => {
        console.error('error', err);
      },
    });
  }
}
