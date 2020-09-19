import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import {ProduitsService} from './services/produits.service'
import {Environment} from './environment/environment'

@Injectable({providedIn: 'root'})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private userService : UserService,
    private produitsService : ProduitsService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const isApiUrl = req.url.startsWith(Environment.apiProduitsUrl) || req.url.startsWith(Environment.apiAccountsUrl);
   const user = this.userService.userValue;
  console.log(" Request Url "+ req.url);
   if (user && isApiUrl) {
    console.log("Add hearded"+ `${user.id_token}`);
    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${user.id_token}`
        }
    });
}
return next.handle(req);
  }
}
