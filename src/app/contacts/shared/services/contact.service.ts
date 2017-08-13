import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contact } from '../';

@Injectable()
export class ContactService {
  private contactsUrl = 'app/contacts';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  public getContacts(): any {
    return this.http.get(this.contactsUrl)
               .toPromise()
               .then(response => response.json().data as Contact)
               .catch(this.handleError);
  }

  public getContact(id: number): Promise<Contact> {
    return this.getContacts()
               .then(contacts => contacts.find(contact => contact.id === id));
  }

  public save(contact: Contact): Promise<Contact> {
    if (contact.id) {
      return this.put(contact);
    }

    return this.post(contact);
  }

  public new(contact: Contact): Promise<Contact> {
    return this.post(contact);
  }

  public delete(contact: Contact): Promise<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;

    return this.http
             .delete(url, {headers: this.headers})
             .toPromise()
             .then(() => null)
             .catch(this.handleError);
  }

  public post(contact: Contact): Promise<Contact> {
    return this.http
        .post(this.contactsUrl, JSON.stringify(contact), {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  public put(contact: Contact): Promise<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;

    return this.http
             .put(url, JSON.stringify(contact), {headers: this.headers})
             .toPromise()
             .then(() => contact)
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
