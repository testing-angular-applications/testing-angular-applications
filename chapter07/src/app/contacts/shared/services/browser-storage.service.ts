import { Injectable } from '@angular/core';
import { IContactPreference } from './preferences.service'

@Injectable()
export class BrowserStorage {
  getItem: (property: string) => string | object;
  setItem: (property: string, value: string | object) => void;
}

@Injectable()
export class BrowserStorageAsync {
  getItem: (property: string) => Promise<IContactPreference>;
  setItem: (property: string, value: string | object) => Promise<boolean>;
}
