import { TestBed, inject } from '@angular/core/testing';
import { PreferencesService } from './preferences.service';
import { BrowserStorage } from "./browser-storage.service";

import { logging } from "selenium-webdriver";
import Preferences = logging.Preferences;

class BrowserStorageMock {
    getItem = (property: string) => ({ key: 'testProp', value: 'testValue '});
    setItem = ({ key: key, value: value }) => {};
}

describe('PreferencesService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PreferencesService, {
                provide: BrowserStorage, useClass: BrowserStorageMock
            }]
        });

    });

    it('should create the Preferences Service', inject([PreferencesService], (service: PreferencesService) => {
        expect(service).toBeTruthy();
    }));

    describe('save preferences', () => {

        it('should save a preference', inject([PreferencesService, BrowserStorage],
            (service: PreferencesService, browserStorage: BrowserStorageMock) => {

                spyOn(browserStorage, 'setItem').and.callThrough();
                service.saveProperty({ key: 'myProperty', value: 'myValue' });
                expect(browserStorage.setItem).toHaveBeenCalledWith('myProperty', 'myValue');
            })
        );

        it('saveProperty should require a non-zero length key', inject([PreferencesService],
            (service: PreferencesService) => {

                const throws = () =>  service.saveProperty({ key: '', value: '' });

                expect(throws).toThrowError();
            })
        );
    });

    describe('get preferences', () => {

        it(`has a 'saveProperty' method`, inject([PreferencesService, BrowserStorage],
            (service: PreferencesService, browserStorage: BrowserStorageMock ) => {

                expect(service.getProperty).toBeDefined();
            })
        );

        it(`returns a ContactPreference`, inject([PreferencesService, BrowserStorage],
            (service: PreferencesService, browserStorage: BrowserStorageMock) => {
                spyOn(browserStorage, 'getItem').and.returnValue({ 'key' : 'pref', value: 'myValue' });

                const prefs = service.getProperty('getItem');
                expect(prefs.key).toEqual('pref');
                expect(prefs.value).toEqual('myValue');

            })
        );

    });
});
