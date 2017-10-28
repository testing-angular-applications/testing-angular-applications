import { TestBed, fakeAsync, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ContactService } from './contact.service';

describe('ContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  describe('getContacts', () => {
    let mockBackend;
    let mockContact;
    let mockGetContactsResponse;

    beforeEach(inject([MockBackend], (_MockBackend_) => {
      mockBackend = _MockBackend_;
      mockContact = { id: 100, name: 'Erin Dee', email: 'edee@example.com' };
      mockGetContactsResponse = new Response(new ResponseOptions({ body: { data: [ mockContact ] }}));
    }));

    afterEach(() => {
      mockBackend.verifyNoPendingRequests();
      mockBackend.resolveAllConnections();
    });

    it('should GET a list of contacts',
      fakeAsync(inject([ContactService], (service) => {

        mockBackend.connections
          .subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            connection.mockRespond(mockGetContactsResponse);
          });

        service.getContacts()
          .subscribe((contacts) => {
            expect(contacts[0]).toEqual(mockContact);
          });
      }))
    );
  });
});
