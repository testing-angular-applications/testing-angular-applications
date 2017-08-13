import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '../shared/services/contact.service';
import { Contact } from '../shared/models/contact.model';
import { constants } from './new-contact.constants';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  public contact: Contact;
  public id: number;
  public savingContact = false;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.contactService.getContacts()
        .then(contacts => { this.createNewContact(contacts.length) });
  }

  createNewContact(numContacts: number) {
    const contactId = numContacts + 1;

    this.contact = {
      id: contactId,
      email: '',
      number: '',
      country: 'us',
      favorite: false
    };
  }

  public addNewContact(contact: Contact): void {
    if (!this.isFormValid()) {
      return;
    }

    this.savingContact = true;

    this.contactService.save(contact)
        .then(() => {
          this.savingContact = false;
          this.router.navigate(['/']);
    });
  }

  private isEmailValid(): boolean {
    return this.contact.email === '' ||
        (this.contact.email !== '' && this.contact.email.includes('@') && this.contact.email.includes('.'));
  }

  private isPhoneNumberValid(): boolean {
    return this.contact.number === '' ||
        this.contact.number !== '' && this.contact.number.length === 10 && /^\d+$/.test(this.contact.number);
  }

  private isFormValid(): boolean {
    if (!this.isEmailValid()) {
      alert(constants.INVALID_EMAIL_ADDRESS_MESSAGE);
      return false;
    }

    if (!this.isPhoneNumberValid()) {
      alert(constants.INVALID_PHONE_NUMBER_MESSAGE);
      return false;
    }

    return true;
  }
}
