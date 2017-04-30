import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-contact-feed',
  templateUrl: './contact-feed.component.html',
  styleUrls: ['./contact-feed.component.css']
})
export class ContactFeedDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<ContactFeedDialogComponent>) { }

  ngOnInit() {
  }
}
