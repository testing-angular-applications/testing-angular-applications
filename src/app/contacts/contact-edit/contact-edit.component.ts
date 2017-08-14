import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {
  Contact,
  ContactService,
} from '../shared';
import { constants } from './contact-edit.constants';
import { InvalidEmailModalComponent } from '../../shared/modals/invalid-email-modal/invalid-email-modal.component';
import { InvalidPhoneNumberModalComponent } from '../../shared/modals/invalid-phone-number-modal/invalid-phone-number-modal.component';
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
              private snackBar: MdSnackBar, private dialog: MdDialog) { }

  ngOnInit() {
    this.loadContact();
  }

  public getValues(object: Object): string[] {
    return Object.keys(object).map((key, value) => key);
  }

  public saveContact(contact: Contact) {
    contact.favorite = !contact.favorite;
    this.contactService.save(contact);
  }

  public loadContact(): void {
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

  public isEmailValid(email: string): boolean {
    return email === '' || (email !== '' && email.includes('@') && email.includes('.'));
  }

  public isPhoneNumberValid(number: string): boolean {
    return number === '' || number !== '' && number.length === 10 && /^\d+$/.test(number);
  }

  private isFormValid(): boolean {
    if (!this.isEmailValid(this.contact.email)) {
      this.dialog.open(InvalidEmailModalComponent);
      return false;
    }

    if (!this.isPhoneNumberValid(this.contact.email)) {
      this.dialog.open(InvalidPhoneNumberModalComponent);
      return false;
    }

    return true;
  }
}
