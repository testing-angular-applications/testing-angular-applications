describe('country code parameter tests', () => {
  it('should add respective country code', () => {
    const testInputPhoneNumber = '7035550123';
    const format = 'default';
    const countryCode = 'us';
    const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format, countryCode);
    const expectedResult = '+1 (703) 555-0123';

    expect(transformedPhoneNumber).toBe(expectedResult);
  });
});
