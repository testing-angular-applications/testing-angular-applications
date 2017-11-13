describe('loadContact() test', () => {
  it('should load contact', fakeAsync(() => {
    component.isLoading = false;
    component.loadContact();
    fixture.detectChanges();
    const nameInput = rootElement.query(By.css('.contact-name'));
    tick();
    expect(nameInput.nativeElement.value).toBe('janet');
  }));
});
