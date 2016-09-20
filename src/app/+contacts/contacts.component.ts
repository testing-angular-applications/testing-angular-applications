import { Component } from '@angular/core';

import { Contact } from './shared/';

@Component({
  selector: 'ca-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts: Contact[] = [];

  constructor() {}
}
