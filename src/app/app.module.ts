import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '@angular/material';

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
import { NewContactComponent } from './+contacts/new-contact/new-contact.component';
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
    NewContactComponent,
    ShowContactsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MaterialModule.forRoot(),
    RoutingModule
  ],
  providers: [
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
