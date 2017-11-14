import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactFeedDialogComponent } from '../contact-feed';

import {
  Contact,
  ContactService,
} from '../shared';
import { constants } from './contact-detail.constants';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  public loadingContactMessage: string = constants.LOADING_CONTACT_MESSAGE;
  public noContactFoundMessage: string = constants.NO_CONTACT_FOUND_MESSAGE;
  public isLoading = true;
  public contact: Contact = null;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadContact();
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

  openDialog(): void {
    // For instructional purposes, insert a slight delay before opening the dialog
    setTimeout(() => {
      const dialogRef = this.dialog.open(ContactFeedDialogComponent, {disableClose: true, data: {name: this.contact.name}});
      dialogRef.afterClosed().subscribe(result => {
        // TODO do something here if Follow is clicked
      });
    }, 500);
  }
}
