import { Component } from '@angular/core';

import { Contact } from './shared/';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts: Contact[] = [];

  constructor() {}
}
