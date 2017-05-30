import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import {
  Contact,
  ContactService,
} from '../shared';
import { constants } from './contact-edit.constants';
import { countryDialingCodes } from '../shared/phone-number/country-dialing-codes';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  providers: [MdSnackBar]
})
export class ContactEditComponent implements OnInit {
  public loadingContactMessage: string = constants.LOADING_CONTACT_MESSAGE;
  public noContactFoundMessage: string = constants.NO_CONTACT_FOUND_MESSAGE;
  public isLoading = true;
  public contact: Contact = null;
  public countryDialingCodes: Object = this.getValues(countryDialingCodes);

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router,
              private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.loadContact();
  }

  private getValues(object: Object): string[] {
    return Object.keys(object).map((key, value) => { return key });
  }

  public saveContact(contact: Contact) {
    contact.favorite = !contact.favorite;
    this.contactService.save(contact);
  }

  private loadContact(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.contactService.getContact(id)
        .then(contact => {
          this.isLoading = false;
          this.contact = contact;
      });
    });
  }

  public displayEditSnackBar(): void {
    const message = 'Contact updated';
    const snackConfig: MdSnackBarConfig = {duration: 2000};
    const actionLabel = '';

    this.snackBar.open(message, actionLabel, snackConfig);
  }

  public updateContact(contact: Contact): void {
    if (!this.isFormValid()) {
      return;
    }

    this.displayEditSnackBar();
    this.contactService.save(contact)
        .then(() => {
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
