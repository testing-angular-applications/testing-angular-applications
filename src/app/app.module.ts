import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from '@angular/material';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import './rxjs-extensions';

import { ContactsComponent } from './+contacts/contacts.component';
import { ContactDetailComponent } from './+contacts/contact-detail';
import { ContactFeedDialogComponent } from './+contacts/contact-feed';
import { ContactListComponent } from './+contacts/contact-list';
import { ContactEditComponent } from './+contacts/contact-edit';
import { ContactFeedService } from './+contacts/shared/services';
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
    ContactEditComponent,
    ContactDetailComponent,
    ContactFeedDialogComponent,
    ContactListComponent,
    ContactsComponent,
    FavoriteIconDirective,
    PageNotFoundComponent,
    PhoneNumberPipe,
    NewContactComponent,
    ShowContactsDirective
  ],
  entryComponents: [
    ContactFeedDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MaterialModule,
    RoutingModule
  ],
  providers: [
    ContactService,
    ContactFeedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
