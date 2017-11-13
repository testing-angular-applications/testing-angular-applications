import { PhoneNumberPipe } from './phone-number.pipe';
describe('PhoneNumberPipe Tests', () => {
  let phoneNumber: PhoneNumberPipe = null;
  
  beforeEach(() => {
    phoneNumber = new PhoneNumberPipe();
  });
  
  it('should transform the string or number into the default phone format', () => {

    
  });
  
  afterEach(() => {
       phoneNumber = null;
  });  
});
  