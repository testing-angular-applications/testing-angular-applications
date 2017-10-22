import { countryDialingCodes } from './country-dialing-codes';
import { phoneNumberErrorMessages } from './phone-number-error-messages';

export class PhoneNumber {
  private areaCode: string;
  private prefix: string;
  private suffix: string;

  constructor(phoneNumber: string) {
    this.areaCode = this.getAreaCode(phoneNumber);
    this.prefix = this.getPrefixCode(phoneNumber);
    this.suffix = this.getSuffixCode(phoneNumber);
  }

  private getAreaCode(phoneNumber: string): string {
    return phoneNumber.substring(0, 3);
  }

  private getPrefixCode(phoneNumber: string): string {
    return phoneNumber.substring(3, 6);
  }

  private getSuffixCode(phoneNumber: string): string {
    return phoneNumber.substring(6);
  }

  private getDefaultFormattedPhoneNumber(): string {
    return `(${ this.areaCode }) ${ this.prefix }-${ this.suffix }`;
  }

  private getHyphensFormattedPhoneNumber(): string {
    return `${ this.areaCode }-${ this.prefix }-${ this.suffix }`;
  }

  private getDotsFormattedPhoneNumber(): string {
    return `${ this.areaCode }.${ this.prefix }.${ this.suffix }`;
  }

  private getInternationCountryCodeStr(countryCode: string): string {
    countryCode = countryCode.toUpperCase();
    let countryDialingCode = '';

    if (countryDialingCodes[countryCode]) {
      countryDialingCode = `+${ countryDialingCodes[countryCode] }`;
    } else {
      console.warn(phoneNumberErrorMessages.INVALID_COUNTRY_CODE_WARN);
    }

    return countryDialingCode;
  }

  private getFormattedPhoneNumberStr(format = 'default', countryCode?: string): string {
    let formattedPhoneNumber = '';

    switch (format.toLowerCase()) {
      case 'default':
        formattedPhoneNumber =  this.getDefaultFormattedPhoneNumber();
        break;
      case 'dots':
        formattedPhoneNumber = this.getDotsFormattedPhoneNumber();
        break;
      case 'hyphens':
        formattedPhoneNumber = this.getHyphensFormattedPhoneNumber();
        break;
      default:
        console.warn(phoneNumberErrorMessages.INVALID_FORMAT_WARN);
        formattedPhoneNumber = this.getDefaultFormattedPhoneNumber();
    }

    return formattedPhoneNumber;
  }

  public getFormattedPhoneNumber(format = 'default', countryCode?: string): string {
    let formattedPhoneNumber: string = this.getFormattedPhoneNumberStr(format);
    let internationalCountryCodeStr = '';

    if (countryCode && format) {
      internationalCountryCodeStr = this.getInternationCountryCodeStr(countryCode);
      formattedPhoneNumber = internationalCountryCodeStr ?
        `${internationalCountryCodeStr} ${formattedPhoneNumber}` : `${formattedPhoneNumber}`;
    }

    return formattedPhoneNumber;
  }
}
