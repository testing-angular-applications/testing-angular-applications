import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contact } from '../';

@Injectable()
export class ContactService {
  private contactsUrl = 'app/contacts';

  constructor(private http: Http) { }

  public getContacts(): Promise<Contact[]> {
    return this.http.get(this.contactsUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  public getContact(id: number): Promise<Contact> {
    return this.getContacts()
               .then(contacts => contacts.find(contact => contact.id === id));
  }

  public save(contact: Contact): Promise<Contact[]> {
    if (contact.id) {
      return this.put(contact);
    }

    return this.post(contact);
  }

  public delete(contact: Contact) {
    const url = `${this.contactsUrl}/${contact.id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
             .delete(url, headers)
             .toPromise()
             .catch(this.handleError);
  }

  private post(contact: Contact): Promise<Contact[]> {
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http
             .post(this.contactsUrl, JSON.stringify(contact), {headers: headers})
             .toPromise()
             .then(res => res.json().data)
             .catch(this.handleError);
  }

  private put(contact: Contact): Promise<any> {
    const url = `${this.contactsUrl}/${contact.id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
             .put(url, JSON.stringify(contact), {headers: headers})
             .toPromise()
             .then(() => contact)
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
