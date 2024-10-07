import { HttpClient } from '@angular/common/http';
import { Host, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostApiService {

  constructor(private httpclient :HttpClient) { }

  getAllHosts():Observable<Host[]>{
    return this.httpclient.get<Host[]>('http://localhost:3000/host')
  }
  deleteHost(id:String): Observable<any>{
    return this.httpclient.delete(`http://localhost:3000/host/${id}`)
  }
  updateHostApproval(id: string, approved: boolean): Observable<any> {
    return this.httpclient.patch(`http://localhost:3000/host/${id}`, { approved });
  }


  getvisitors():Observable<Host[]>{
    return this.httpclient.get<Host[]>('http://localhost:3000/visitor')
  }

}
