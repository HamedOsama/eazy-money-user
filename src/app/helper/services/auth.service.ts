import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  token: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // User Login
  userLogin(data: any): Observable<any> {
    return this.http.post(`${env.apiRoot}users/login`, data);
  }

  // User Register
  userRegister(data: any): Observable<any> {
    return this.http.post(`${env.apiRoot}users/signup`, data);
  }
  // Forget Password ✅
  forgetPassword(email: string) {
    return this.http.put(`${env.apiRoot}/users/forget-password`, email);
  }

  // Reset Password ✅
  resetPassword(password: any, token: any) {
    return this.http.put(
      `${env.apiRoot}/users/auth/reset-password/${token}`,
      password
    );
  }

  getLoggedUserAllInfo(token: any) {
    return this.http.get(`${env.apiRoot}users/get-user`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getLoggedUserPersonalInfo(token: any) {
    return this.http.get(`${env.apiRoot}users/get-user-info`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  // logOut
  logOut(token: any) {
    return this.http.delete(`${env.apiRoot}/users/logout`, {
      headers: {
        Authorization: `barrier ${token}`,
      },
    });
  }

  // Logout From All Devices
  logOutFromAllDevices(token: any) {
    return this.http.delete(`${env.apiRoot}/users/logout-all-devices`, {
      headers: {
        Authorization: `barrier ${token}`,
      },
    });
  }
}
