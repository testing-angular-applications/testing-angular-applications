import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty'

import { Contact } from '../';

@Injectable()
export class ContactService {
  private contactsUrl = 'app/contacts';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  public getContacts(): any {
    return this.http.get(this.contactsUrl)
               .map(response => response.json().data as Contact)
               .catch(this.handleError);
  }

  public getContact(id: number): Observable<Contact> {
    return this.getContacts()
               .map(contacts => contacts.find(contact => contact.id === id));
  }

  public save(contact: Contact): Observable<Contact> {
    if (contact.id) {
      return this.put(contact);
    }

    return this.post(contact);
  }

  public new(contact: Contact): Observable<Contact> {
    return this.post(contact);
  }

  public delete(contact: Contact): Observable<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;

    return this.http
             .delete(url, {headers: this.headers})
             .switchMap(() => Observable.empty())
             .catch(this.handleError);
  }

  public post(contact: Contact): Observable<Contact> {
    return this.http
        .post(this.contactsUrl, JSON.stringify(contact), {headers: this.headers})
        .map(res => res.json())
        .catch(this.handleError);
  }

  public put(contact: Contact): Observable<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;

    return this.http
             .put(url, JSON.stringify(contact), {headers: this.headers})
             .map(() => contact)
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
