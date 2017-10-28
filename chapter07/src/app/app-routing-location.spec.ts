import { Component, DebugElement, Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

@Injectable()
class NavConfigService {
  menu = [{ label: 'Home', path: '/target/12' }];
}

@Component({ // #A
  selector: `navigation-menu`, // #A
  template: `<div><a *ngFor="let item of menu" [id]="item.label" [routerLink]="item.path">{{ item.label }}</a></div>`, // #A
}) // #A
class NavigationMenu implements OnInit { // #A
  menu: any; // #A
  constructor(private navConfig: NavConfigService) { } // #A
 // #A
  ngOnInit() { // #A
    this.menu = this.navConfig.menu; // #A
  } // #A
} // #A


@Component({ // #A
  selector: 'app-root', // #A
  template: `<router-outlet></router-outlet>`, // #A
}) // #A
class AppComponent { } // #A

@Component({ // #B
  selector: `simple-component`, // #B
  template: `simple` // #B
}) // #B
class SimpleComponent { } // #B

describe('Testing routes', () => { // #C
  let fixture;
  let router: Router;
  let location: Location;

  beforeEach(() => { // #C
    TestBed.configureTestingModule({ // #C
      imports: [RouterTestingModule.withRoutes([ // #C
        { path: '', component: NavigationMenu }, // #C
        { path: 'target/:id', component: SimpleComponent } // #C
      ])], // #C
      providers: [{  // #C
        provide: NavConfigService,  // #C
        useValue: { menu: [{ label: 'Home', path: '/target/fakeId' }] }  // #C
      }], // #C
      declarations: [NavigationMenu, SimpleComponent, AppComponent], // #C
    }); // #C

  });

  beforeEach(fakeAsync(() => { // #D
    router = TestBed.get(Router); // #D
    location = TestBed.get(Location); // #D
    fixture = TestBed.createComponent(AppComponent); // #D
    router.navigateByUrl('/'); // #D
    advance(); // #D
  })); // #D

  function advance(): void {
    flush();
    fixture.detectChanges();
  }

  it('Tries to route to a page', fakeAsync(() => { // #A
    const menu = fixture.debugElement.query(By.css('a')); // #A
    menu.triggerEventHandler('click', { button: 0 }); // #A
    advance(); // #A
    expect(location.path()).toEqual('/target/fakeId'); // #A
  })); // #A
});
