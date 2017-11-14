import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import {
  Contact,
  ContactService
} from '../shared';
import { constants } from './contact-list.constants';
import { CONTACTS } from '../shared/data/mock-contacts';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [MatSnackBar]
})
export class ContactListComponent implements OnInit {
  public noContactsFoundMessage: string = constants.NO_CONTACTS_FOUND_MESSAGE;
  public loadingContactsMessage: string = constants.LOADING_CONTACTS_MESSAGE;
  public deletingContactsMessage: string = constants.DELETING_CONTACTS_MESSAGE;
  public deletingContactMessage: string = constants.DELETING_CONTACT_MESSAGE;
  public isLoading = true;
  public deletingContacts = false;
  public deletingContact = false;
  public readonly backupContacts: Array<Contact> = CONTACTS.slice();
  public selectedContact: Contact;

  @Input('contacts') contacts: Contact[];

  constructor(private contactService: ContactService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getContacts();
  }

  public onClick(contact: Contact): void {
    this.router.navigate(['/contact', contact.id]);
  }

  public editContact(contact: Contact): void {
      this.router.navigate(['/edit', contact.id]);
  }

  public displayDeleteSnackBar(contact: Contact): void {
    const message = `${contact.name} deleted.`;
    const snackConfig: MatSnackBarConfig = {duration: 2000};
    const actionLabel = '';

    this.snackBar.open(message, actionLabel, snackConfig);
  }

  public deleteContact(contact: Contact): void {
    this.deletingContact = true;
    this.displayDeleteSnackBar(contact);

    this.contactService
        .delete(contact)
        .then(() => {
          this.contacts = this.contacts.filter(c => c !== contact);

          if (this.selectedContact === contact) {
            this.selectedContact = null;
          }

          this.deletingContact = false;
    });
  }

  public deleteContacts(): void {
    this.deletingContacts = true;

    this.contacts.forEach((contact, index) => {
      this.contactService.delete(contact);

      if (index === this.contacts.length - 1) {
        this.getContacts();
      }
    });
  }

  public getContacts(): void {
    this.isLoading = true;

    this.contactService.getContacts()
      .then(contacts => {
        this.isLoading = false;
        this.deletingContacts = false;
        this.contacts = contacts;
      });
  }

  public refreshContacts() {
    this.backupContacts.forEach((contact, index) => {
      this.contactService.post(contact);

      if (index === this.backupContacts.length - 1) {
        this.getContacts();
      }
    });
  }

  public saveContact(contact: Contact) {
    contact.favorite = !contact.favorite;
    this.contactService.save(contact);
  }

  public onSelect(contact: Contact): void {
    this.selectedContact = contact;
  }
}
