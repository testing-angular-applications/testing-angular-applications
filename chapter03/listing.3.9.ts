describe('updateContact() tests', () => {
  it('should update the contact', fakeAsync(() => {
    const newContact = {
      id: 1,
      name: 'delia',
      email: 'delia@example.com',
      number: '1234567890'
    };

    component.contact = {
      id: 2,
      name: 'rhonda',
      email: 'rhonda@example.com',
      number: '1234567890'
    };

    component.isLoading = false;
    fixture.detectChanges();
    const nameInput = rootElement.query(By.css('.contact-name'));
    tick();
    expect(nameInput.nativeElement.value).toBe('rhonda');

    component.updateContact(newContact);
    fixture.detectChanges();
    tick(100);
    expect(nameInput.nativeElement.value).toBe('delia');
  }));
});
