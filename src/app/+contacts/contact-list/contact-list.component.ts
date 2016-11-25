import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Contact,
  ContactService
} from '../shared';
import { constants } from './contact-list.constants';
import { CONTACTS } from '../../+contacts/shared/data/mock-contacts';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public noContactsFoundMessage: string = constants.NO_CONTACTS_FOUND_MESSAGE;
  public loadingContactsMessage: string = constants.LOADING_CONTACTS_MESSAGE;
  public deletingContactMessage: string = constants.DELETING_CONTACT_MESSAGE;
  public deletingContactsMessage: string = constants.DELETING_CONTACTS_MESSAGE;
  public isLoading: boolean = true;
  public hovering: boolean = false;
  public deletingContact: boolean = false;
  public deletingContacts: boolean = false;
  public readonly backupContacts: Array<Contact> = CONTACTS.slice();

  @Input('contacts') contacts: Contact[];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.getContacts();
  }

  public onClick(contact: Contact): void {
    this.router.navigate(['/contact', contact.id]);
  }

  public editContact(): void {
    console.log('editing contact...');
  }

  public deleteContact(contact: Contact): void {
    this.deletingContact = true;
    this.contactService.delete(contact).then(() => {
      this.deletingContact = false;
      this.contacts = this.contacts.filter(c => c !== contact);
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
}
