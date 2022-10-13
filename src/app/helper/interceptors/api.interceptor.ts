// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// const TOKEN_HEADER_KEY = 'Authorization';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     let authReq = request;
//     const token = localStorage.getItem('userToken');
//     if (token != null) {
//       authReq = request.clone({
//         headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
//       });
//     }
//     return next.handle(authReq);
//   }
// }

// export const authInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
// ];

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken') !== null) {
        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            localStorage.getItem('userToken')!
          ),
        });
      }
    }
    return next.handle(request);
  }
}
