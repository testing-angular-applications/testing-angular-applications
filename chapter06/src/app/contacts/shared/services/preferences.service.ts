import { Injectable } from '@angular/core';
import { BrowserStorage } from './browser-storage.service';

export interface IContactPreference {
  key: string;
  value: string | object;
}

@Injectable()
export class PreferencesService {

  constructor(private browserStorage: BrowserStorage ) { }

  public saveProperty(preference: IContactPreference) {
    if (!preference.key.length) {
      throw new Error('saveProperty requires a non-blank property name');
    }
    this.browserStorage.setItem(preference.key, preference.value);
  }

  public getProperty(key: string) : any {
    return this.browserStorage.getItem(key);
  }
}
