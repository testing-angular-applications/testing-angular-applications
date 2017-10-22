import { Component, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router, CanActivate } from "@angular/router";

@Injectable()
class UserAuthentication {
  private isUserAuthenticated: boolean = false;
  authenticateUser() {
    this.isUserAuthenticated = true;
  }
  getAuthenticated() {
    return this.isUserAuthenticated;
  }
}

@Injectable()
class AuthenticationGuard implements CanActivate {
  constructor(private userAuth: UserAuthentication) {}
  canActivate(): Promise<boolean> | boolean {
    return new Promise((resolve) => resolve(this.userAuth.getAuthenticated()));
  }
}

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
class AppComponent { }

@Component({
  selector: `target`,
  template: `target`
})
class TargetComponent { }

describe('Testing routing guards', () => {
  let router;
  let location;
  let fixture;
  let userAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: '', component: AppComponent },
        {
          path: 'protected',
          component: TargetComponent,
          canActivate: [AuthenticationGuard],
        },
      ])],
      providers: [AuthenticationGuard, UserAuthentication],
      declarations: [TargetComponent, AppComponent],
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    userAuthService = TestBed.get(UserAuthentication);
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  it('tries to route to a page without authentication', fakeAsync(() => {
    router.navigate(['protected']);
    flush();
    expect(location.path()).toEqual('/');
  }));

  it('tries to route to a page after authentication', fakeAsync(() => {
    userAuthService.authenticateUser();
    router.navigate(['protected']);
    flush();
    expect(location.path()).toEqual('/protected');
  }));

});

