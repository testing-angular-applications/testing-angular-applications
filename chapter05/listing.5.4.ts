it('should format the phone number using the hyphens format', () => {
  const testInputPhoneNumber = '7035550123';
  const format = 'default';
  const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
  const expectedResult = '(703) 555-0123';

  expect(transformedPhoneNumber).toBe(expectedResult);
});


it('should format the phone number using the hyphens format', () => {
  const testInputPhoneNumber = '7035550123';
  const format = 'hyphens';
  const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
  const expectedResult = '703-555-0123';

  expect(transformedPhoneNumber).toBe(expectedResult);
});

it('should format the phone number using the default format if unrecongized format is entered',() => {
  const testInputPhoneNumber = '7035550123';
  const format = 'gibberish';
  const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
  const expectedResult = '(703) 555-0123';

  expect(transformedPhoneNumber).toBe(expectedResult);
});
