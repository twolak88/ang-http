import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Request its on its way");
    console.log(request.url);
    const modifiedRequest = request.clone(
      {
        headers: request.headers.append('Auth', 'XXXXXXXXXXX')
      });
    return next.handle(modifiedRequest);
  }
}
