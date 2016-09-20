import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './+contacts/contacts.component';
import { ContactDetailComponent } from './+contacts/contact-detail/contact-detail.component';
import { PageNotFoundComponent } from './+page-not-found-component';

const appRoutes: Routes = [
    { path: '', component: ContactsComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'contact/:id', component: ContactDetailComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
