import {Component, OnInit, OnDestroy, NgZone, Optional, Inject} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {ContactFeedService} from '../shared/services/contact-feed.service';

import { Subscription } from 'rxjs/Subscription';



@Component({
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(5000)
      ]),
      transition('* => void', [
        animate(5000, style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
  selector: 'app-contact-feed',
  templateUrl: './contact-feed.component.html',
  styleUrls: ['./contact-feed.component.css']
})
export class ContactFeedDialogComponent implements OnInit, OnDestroy {
  sub: Subscription;
  updates: string[] = [];
  name: string;
  closeDisabled = true;

  constructor(public dialogRef: MdDialogRef<ContactFeedDialogComponent>, private feed: ContactFeedService, private zone: NgZone,
  @Optional() @Inject(MD_DIALOG_DATA) data: any) {
    this.name = data.name;
  }

  ngOnInit() {
    /*
     This version runs inside the Angular zone, and will block Protractor testing indefinitely.
     this.sub = this.feed.getFeed().subscribe((x) => {
       this.updates.push(x);
       if (this.updates.length > 5) {
         this.updates.shift();
       }
     });
    */
    this.closeDisabled = false;

    this.zone.runOutsideAngular(() => {
      this.sub = this.feed.getFeed().subscribe((x) => {
        this.zone.run(() => {
          this.updates.push(x);
          if (this.updates.length > 4) {
            this.updates.shift();
          }
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
