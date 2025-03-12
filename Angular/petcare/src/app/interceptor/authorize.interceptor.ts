import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
//import { AuthService } from './auth.service';

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private router:Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.GiveToken();

    let request = req;

    if (authToken) {

      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401){
          console.log("Session Expired , please login again.")
          this.authService.Disconect()
          this.router.navigate(['/login'])
          //location.reload()
        }

        if (error.status === 403){
          //this.authService.Disconect()
          this.router.navigate(['/denied'])
          //location.reload()
        }

        if (error.status === 404){
          this.router.navigate(['/404'])
        }
        return throwError(() => new Error(error.message))
      })
    )
  }
}
