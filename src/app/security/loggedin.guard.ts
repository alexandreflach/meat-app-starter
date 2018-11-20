import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate{

  constructor(private loginService: LoginService){}

  checkAuthentication(path: string){
    const loggedIn = this.loginService.isLoggedIn()
    if(!loggedIn){
      this.loginService.handleLogin(`/${path}`)
    }
    return loggedIn
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication(route.routeConfig.path)
  }
}
