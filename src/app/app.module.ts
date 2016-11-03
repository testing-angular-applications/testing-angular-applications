import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import './rxjs-extensions';

import { ContactsComponent } from './+contacts/contacts.component';
import { ContactDetailComponent } from './+contacts/contact-detail';
import { ContactListComponent } from './+contacts/contact-list';
import { ContactService } from './+contacts/shared/services';
import { FavoriteIconDirective } from './+contacts/shared/favorite-icon';
import { PageNotFoundComponent } from './+page-not-found-component';
import { PhoneNumberPipe } from './+contacts/shared/phone-number';
import { ShowContactsDirective } from './+contacts/shared/show-contacts';

import { AppComponent } from './app.component';
import { RoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactListComponent,
    ContactsComponent,
    FavoriteIconDirective,
    PageNotFoundComponent,
    PhoneNumberPipe,
    ShowContactsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdProgressBarModule,
    MdToolbarModule,
    RoutingModule
  ],
  providers: [
    ContactService,
    MdIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
