it('should not display anything if the length is not ten digits', () => {
  const testInputPhoneNumber = '703555012';
  const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber);
  const expectedResult = '';

  expect(transformedPhoneNumber).toBe(expectedResult);
});
