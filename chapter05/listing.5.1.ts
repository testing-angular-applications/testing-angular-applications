import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe Tests', () => {
  let phoneNumber: PhoneNumberPipe = null;

  beforeEach(() => {
    phoneNumber = new PhoneNumberPipe();
  });

  describe('default behavior', () => {
    it('should transform the string or number into the default phone format', () => {
      const testInputPhoneNumber = '7035550123';
      const transformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber);
      const expectedResult = '(703) 555-0123';

      expect(transformedPhoneNumber).toBe(expectedResult);
    });
  });

  afterEach(() => {
    phoneNumber = null;
  });
});
