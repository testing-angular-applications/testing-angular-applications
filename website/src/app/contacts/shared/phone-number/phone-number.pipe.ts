import { Pipe, PipeTransform } from '@angular/core';

import { PhoneNumber } from './phone-number.model';
import { phoneNumberErrorMessages } from './phone-number-error-messages';

/**
 * PhoneNumberPipe
 * ===============
 * The PhoneNumberPipe takes in a string or a number and transforms that input
 * into a formatted format. The format is optional and if it is not entered as
 * a parameter then the number will be formatted using the (XXX) XXX-XXXX format
 * by default. there is a format based on the format (optional) and country
 * code (optional). If the format is not entered, the number will be formatted
 * using the (XXX) XXX-XXXX format by default.
 *
 * The PhoneNumberPipe currently only supports phone numbers
 * in the North American Numbering Plan. Please see
 * https://en.wikipedia.org/wiki/North_American_Numbering_Plan for details.
 *
 * No parameters
 * -------------
 * Not specifying a format parameter will result in the pipe transforming the
 * value into a default phone format, which is (XXX) XXX-XXXX.
 *
 * Usage:
 * {{ <phone number> | phoneNumber }}
 *
 * Example:
 * {{ 7035551234 | phoneNumber }}
 * (703) 555-1234
 *
 * Phone Number Format Parameter (optional)
 * ----------------------------------------
 * The first parameter is the phone format which is optional. If there is no
 * format entered, then the default format, (XXX) XXX- XXXX, will be used.
 * Acceptable parameters are "default", "dots", "hyphens". The phone number
 * parameter is case insensitive.
 *
 * Usage:
 * {{ <phone number> | phoneNumber : <format-type> }}
 *
 * Examples:
 * {{ 7035551234 | phoneNumber : "default" }}
 * (703) 555-1234
 *
 * {{ 7035551234 | phoneNumber : "DOTS" }}
 * 703.555.1234
 *
 * {{ 7035551234 | phoneNumber : "hyphens" }}
 * 703-555-1234
 *
 * Country Code Parameter (optional)
 * ---------------------------------
 * The second parameter is the country code. Any valid two character country
 * code that uses the North American Numbering Plan is acceptable. To see a list
 * of countries that use the North American Numbering Plan see
 * https://en.wikipedia.org/wiki/North_American_Numbering_Plan. To find their
 * respective two character country code please see:
 * http://www.worldatlas.com/aatlas/ctycodes.htm. The country code parameter is
 * case insensitive.
 *
 * Usage:
 * {{ <phone number> | phoneNumber : <format-type> : <country-code> }}
 *
 * Example:
 * {{ 7035551234 | phoneNumber : "DOTS" : "US" }}
 * +1 703.555.1234
 *
 * Allow Empty String (optional)
 * ---------------------------------
 * Using this third parameter you can allow empty strings without throwing an
 * exception.
 *
 * Usage:
 * {{ <phone number> | phoneNumber : <format-type> : <country-code> : <boolean> }}
 *
 * Example:
 * {{ 7035551234 | phoneNumber : "DOTS" : "US" : true }}
*/
@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string = '', format?: string, countryCode: string = '', allowEmptyString?: boolean): string {
    let phoneNumber: PhoneNumber = null;
    let formattedPhoneNumber = '';

    if (allowEmptyString && value === '') {
      return '';
    }

    if (this.isPhoneNumberValid(value)) {
      phoneNumber = new PhoneNumber(value);
      formattedPhoneNumber = phoneNumber.getFormattedPhoneNumber(format, countryCode);
    }

    return formattedPhoneNumber;
  }

  private isPhoneNumberValid(phoneNumber: any): boolean {
    const VALID_PHONE_LENGTH = 10;
    let isPhoneNumberValid = false;

    if (isNaN(phoneNumber)) {
      console.error(phoneNumberErrorMessages.INVALID_PHONE_NUMBER_TYPE_ERR);
    } else if (phoneNumber.toString().length !== VALID_PHONE_LENGTH) {
      console.error(phoneNumberErrorMessages.INVALID_PHONE_NUMBER_LENGTH_ERR);
    } else {
      isPhoneNumberValid = true;
    }

    return isPhoneNumberValid;
  }
}
