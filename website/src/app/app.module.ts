import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppMaterialModule } from './app.material.module';
import { ContactDetailComponent } from './contacts/contact-detail';
import { ContactEditComponent } from './contacts/contact-edit';
import { ContactListComponent } from './contacts/contact-list';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactFeedDialogComponent } from './contacts/contact-feed';
import { ContactFeedService } from './contacts/shared/services';
import { ContactService } from './contacts/shared/services';
import { FavoriteIconDirective } from './contacts/shared/favorite-icon';
import { PageNotFoundComponent } from './page-not-found-component';
import { PhoneNumberPipe } from './contacts/shared/phone-number';
import { NewContactComponent } from './contacts/new-contact/new-contact.component';
import { ShowContactsDirective } from './contacts/shared/show-contacts';

import { AppComponent } from './app.component';
import { RoutingModule } from './app-routing.module';
import { InvalidEmailModalComponent } from './contacts/shared';
import { InvalidPhoneNumberModalComponent } from './contacts/shared';

@NgModule({
  declarations: [
    AppComponent,
    ContactEditComponent,
    ContactDetailComponent,
    ContactFeedDialogComponent,
    ContactListComponent,
    ContactsComponent,
    FavoriteIconDirective,
    InvalidEmailModalComponent,
    InvalidPhoneNumberModalComponent,
    PageNotFoundComponent,
    PhoneNumberPipe,
    NewContactComponent,
    ShowContactsDirective
  ],
  entryComponents: [
    ContactFeedDialogComponent,
    InvalidEmailModalComponent,
    InvalidPhoneNumberModalComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: true }),
    RoutingModule
  ],
  providers: [
    ContactService,
    ContactFeedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
