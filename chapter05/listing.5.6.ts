it('should not add anything if the country code is unrecongized', () => {
  const testInputPhoneNumber = '7035550123';
  const format = 'default';
  const countryCode = 'zz';
  const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format, countryCode);
  const expectedResult = '(703) 555-0123';

  expect(transformedPhoneNumber).toBe(expectedResult);
});
