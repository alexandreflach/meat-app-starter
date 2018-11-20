import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login/login.service";
import { Injectable, Injector } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService)
    if(loginService.isLoggedIn()){
      const authRequest = req.clone(
        {setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}})
      return next.handle(authRequest)
    } else {
      return next.handle(req)
    }
  }

}
