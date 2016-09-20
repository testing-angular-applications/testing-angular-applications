import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Contact,
  ContactService
} from '../shared';

@Component({
  selector: 'ca-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public noContactsMessage: string = 'You do not have any contacts yet';
  public loadingMessage: string = 'Loading contacts...';
  public isLoading: boolean = true;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.addContacts();
  }

  onSelect(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }

  @Input('contacts') contacts: Contact[];

  public deleteContacts() {
    this.contacts = [];
  }

  public addContacts() {
    this.isLoading = true;
    this.contactService.getContacts()
      .then(contacts => {
        this.isLoading = false;
        this.contacts = contacts;
      });
  }
}
