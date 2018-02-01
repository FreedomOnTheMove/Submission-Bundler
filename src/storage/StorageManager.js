import * as mobx from 'mobx';

mobx.useStrict(true);

class StorageManager {
    constructor() {
        mobx.extendObservable(this, {
            currentStep: 1,
            institutionName: '',
            institutionAddress: '',
            contactName: '',
            contactEmail: '',
            submissionDescription: '',
            submissionIdentifier: '',
            newspaperInfo: new mobx.ObservableMap(),

            handleChange: mobx.action.bound(function (event) {
               let value = event.target.value;
               switch (event.target.name) {
                   case 'institutionName':
                       this.institutionName = value;
                       break;
                   case 'institutionAddress':
                       this.institutionAddress = value;
                       break;
                   case 'contactName':
                       this.contactName = value;
                       break;
                   case 'contactEmail':
                       this.contactEmail = value;
                       break;
                   case 'submissionDescription':
                       this.submissionDescription = value;
                       break;
                   case 'submissionIdentifier':
                       this.submissionIdentifier = value;
                       break;
                   default:
                       break;
               }
            }),

            addNewspaper: mobx.action.bound(function (newspaper) {
               this.newspaperInfo.set(newspaper.id, newspaper);
            }),

            deleteNewspaper: mobx.action.bound(function (key) {
                this.newspaperInfo.delete(key);
            }),

            setCurrentStep: mobx.action.bound(function (step) {
                this.currentStep = step;
            })

        });
    }

}

export {StorageManager};
