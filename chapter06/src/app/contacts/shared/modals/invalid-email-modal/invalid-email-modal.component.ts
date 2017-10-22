import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { constants } from '../modal.constants';

@Component({
  selector: 'app-invalid-email-modal',
  templateUrl: './invalid-email-modal.component.html',
  styleUrls: ['./invalid-email-modal.component.css']
})
export class InvalidEmailModalComponent implements OnInit {
  invalidEmailMessage = constants.INVALID_EMAIL_ADDRESS_MESSAGE;

  constructor(public dialogRef: MdDialogRef<InvalidEmailModalComponent>) { }

  ngOnInit() {
  }

}
