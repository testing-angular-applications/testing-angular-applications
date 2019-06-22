import { Injectable } from '@angular/core';

import { Contact } from '../';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactService {
  private contactsUrl = 'app/contacts';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  public getContacts(): any {
    return this.http.get(this.contactsUrl)
               .pipe(map((next: any) => next.data))
               .toPromise()
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
        .post(this.contactsUrl, contact, {headers: this.headers})
        .toPromise()
        .catch(this.handleError);
  }

  public put(contact: Contact): Promise<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;

    return this.http
             .put(url, contact, {headers: this.headers})
             .toPromise()
             .then(() => contact)
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
