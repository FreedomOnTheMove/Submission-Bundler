import * as mobx from 'mobx';
import lodash from 'lodash';
import { ulid } from 'ulid';

mobx.useStrict(true);

class StorageManager {
    constructor() {
        mobx.extendObservable(this, {
            validationTrigger: mobx.observable(0),
            currentStep: 0,
            stepValidation: [false, true, true, true, false],
            contactInfo: new mobx.ObservableMap(new Map([
                ['institutionName', ''],
                ['institutionAddress', ''],
                ['contactName', ''],
                ['contactEmail', ''],
                ['submissionDescription', ''],
                ['submissionIdentifier', ulid()],
            ])),
            newspapers: new mobx.ObservableMap(),

            handleChange: mobx.action.bound(function (event) {
                let value = event.target.value;
                switch (event.target.name) {
                    case 'institutionName':
                        this.contactInfo.set('institutionName', value);
                        break;
                    case 'institutionAddress':
                        this.contactInfo.set('institutionAddress', value);
                        break;
                    case 'contactName':
                        this.contactInfo.set('contactName', value);
                        break;
                    case 'contactEmail':
                        this.contactInfo.set('contactEmail', value);
                        break;
                    case 'submissionDescription':
                        this.contactInfo.set('submissionDescription', value);
                        break;
                    default:
                        break;
                }
            }),

            addNewspaper: mobx.action.bound(function (newspaper) {
                newspaper.advertisements = new mobx.ObservableMap();
                this.newspapers.set(newspaper.id, newspaper);
                this.setStepValidation(2, false);
            }),

            deleteNewspaper: mobx.action.bound(function (key) {
                this.newspapers.delete(key);
                if (this.newspapers.size === 0) {
                    this.setStepValidation(2, true);
                }
            }),

            addAdvertisement: mobx.action.bound(function (newspaperKey, advertisement) {
                this.newspapers.get(newspaperKey).advertisements.set(advertisement.id, advertisement);
            }),

            deleteAdvertisement: mobx.action.bound(function (newspaperKey, advertisementKey) {
                this.newspapers.get(newspaperKey).advertisements.delete(advertisementKey);
            }),

            validateAdvertisementUploads: mobx.action.bound(function () {
                let moreUploadsRequired = false;
                lodash.forEach(this.newspapers.values(), function (newspaper) {
                    if (newspaper.advertisements.size === 0) {
                        moreUploadsRequired = true;
                    }
                });

                if (moreUploadsRequired) {
                    this.setStepValidation(3, true);
                } else {
                    this.setStepValidation(3, false);
                }
            }),

            setCurrentStep: mobx.action.bound(function (step) {
                this.currentStep = step;
            }),

            setStepValidation: mobx.action.bound(function (step, state) {
               this.stepValidation[step] = state;
            }),

            validate: mobx.action.bound(function () {
                this.validationTrigger = mobx.observable(this.currentStep);
            })

        });
    }

}

export {StorageManager};
