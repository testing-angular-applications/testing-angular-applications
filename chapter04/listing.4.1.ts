beforeEach(() => {
  const testModuleMetadata: TestModuleMetadata = {
    declarations: [FavoriteIconDirective, TestComponent]
  };
  fixture = TestBed.configureTestingModule(testModuleMetadata)
                    .createComponent(TestComponent);
  fixture.detectChanges();
});