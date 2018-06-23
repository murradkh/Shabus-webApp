import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './services/http.service';
import { SigninComponent } from './auth/signin/signin.component';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private httpService: HttpService,
    private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let authnicated = this.httpService.is_Authinicated();
    if (state.url == '/signIn')
      if (authnicated == false)
        return true;
      else return false;

    if (authnicated == false) {
      this.router.navigate(['/signIn']);
      return false;
    } return true;
  }
}