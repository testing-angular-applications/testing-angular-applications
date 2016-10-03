import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MdIconRegistry } from '@angular2-material/icon';

import {
  Contact,
  ContactService,
} from '../shared';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  viewProviders: [MdIconRegistry]
})
export class ContactDetailComponent implements OnInit {
  public isLoading: boolean = true;
  public contact: Contact = null;
  public loadingMessage: string = 'Loading contact...';
  public noContactFoundMessage: string = 'Contact not found';

  constructor(private contactService: ContactService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadContact();
  }

  private loadContact() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.contactService.getContact(id)
        .then(contact => {
          this.isLoading = false;
          this.contact = contact;
      });
    });
  }
}
