beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ContactEditComponent, FavoriteIconDirective, InvalidEmailModalComponent, InvalidPhoneNumberModalComponent],
    imports: [
      AppMaterialModule,
      FormsModule,
      NoopAnimationsModule,
      RouterTestingModule
    ],
    providers: [{provide: ContactService, useValue: contactServiceStub}]
  });

  TestBed.overrideModule(BrowserDynamicTestingModule, {
    set: {
      entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
    }
  });

  contactService = TestBed.get(ContactService);
});
