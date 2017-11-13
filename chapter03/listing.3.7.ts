describe('saveContact() test', () => {
  it('should display contact name after contact set', fakeAsync(() => {
    const contact = {
      id: 1,
      name: 'lorace'
    };

    component.isLoading = false;
    component.saveContact(contact);
    fixture.detectChanges();
    const nameInput = rootElement.query(By.css('.contact-name'));
    tick();
    expect(nameInput.nativeElement.value).toBe('lorace');
  }));
});
