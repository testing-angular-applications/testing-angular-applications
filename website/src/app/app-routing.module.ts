import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { NewContactComponent } from './contacts/new-contact/new-contact.component';
import { PageNotFoundComponent } from './page-not-found-component';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'add', component: NewContactComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact/:id', component: ContactDetailComponent },
  { path: 'edit/:id', component: ContactEditComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
