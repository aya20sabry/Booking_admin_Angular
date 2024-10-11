import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../../environment/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  userLog: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userLog = new BehaviorSubject<boolean>(this.isUserLoggedIn);
    this.userLog.next(this.isUserLoggedIn);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            this.setToken(response.token);
            this.userLog.next(true);
          }
          return response;
        })
      );
  }

  get isUserLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getUserStatus() {
    return this.userLog.asObservable();
  }

  logout() {
    this.removeToken();
    this.userLog.next(false);
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
////////////////////////////////
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private apiUrl = 'http://localhost:3000/admin';
//   private tokenKey = 'token';

//   constructor(
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {}

//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, { email, password });
//   }

//   logout(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.removeItem(this.tokenKey);
//     }
//   }

//   get isUserLoggedIn(): boolean {
//     if (isPlatformBrowser(this.platformId)) {
//       return !!localStorage.getItem(this.tokenKey);
//     }
//     return false;
//   }

//   getToken(): string | null {
//     if (isPlatformBrowser(this.platformId)) {
//       return localStorage.getItem(this.tokenKey);
//     }
//     return null;
//   }

//   setToken(token: string): void {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.setItem(this.tokenKey, token);
//     }
//   }
// }