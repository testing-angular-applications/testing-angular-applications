it('should format the phone number using the dots format', () => {
  const testInputPhoneNumber = '7035550123';
  const format = 'dots';
  const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
  const expectedResult = '703.555.0123';

  expect(transformedPhoneNumber).toBe(expectedResult);
});
