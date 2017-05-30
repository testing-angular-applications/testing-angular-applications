import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

const FEED_UPDATES = [
  `Time my favorite, for burritos and beers #BurritoLyfe`,
  `Had my first Soylent today. I\'ve reached peak SF.`,
  `Is it raining for anyone else, or is it just me?`,
  `lmao cats are so funny!`,
  `When I say mizzenmast, what I really mean is larders`,
  `A rolling stone is your oyster`,
  `Taco Bell? More like Taco Cartel, amirite?`,
  `"Um" - 1st horse that got ridden`,
  `The guy at Chipotle couldn\'t close my burrito. He looked up at me. I looked at him. I whispered, "It\'s not your fault." He wept in my
   arms.`
];

/**
 * A fake service that returns an observable of a contact's social media updates.
 */
@Injectable()
export class ContactFeedService {
  constructor() { }

  public getFeed() {
    return Observable.interval(500)
      .map((x) => Math.random() * 2 + 2)
      .concatMap((x) => Observable.of(x).delay(x * 1000))
      .map((x) => FEED_UPDATES[Math.floor(Math.random() * FEED_UPDATES.length)]);
  }
}
