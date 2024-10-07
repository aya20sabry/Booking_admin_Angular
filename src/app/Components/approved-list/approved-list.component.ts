import { Component } from '@angular/core';
import { HostApiService } from '../../Services/host-api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approved-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './approved-list.component.html',
  styleUrl: './approved-list.component.css'
})
export class ApprovedListComponent {
  router: any;


  constructor(private HostApi:HostApiService) { }

  Host:any[]=[]

  ngOnInit():void{

    this.HostApi.getAllHosts().subscribe({
      next:(host)=>{

        this.Host=host
        console.log("test");

      },
      error:(err)=>{
        console.log(err);

      }


    })


  }


}

 //

