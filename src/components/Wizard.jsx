import React, {Component} from 'react';
import {observer} from 'mobx-react';

import ContactStep from './Steps/Contact';
import NewspaperInfoStep from './Steps/NewspaperInfo';
import AdvertisementSelectionStep from './Steps/AdvertisementSelection';
import BundleStep from './Steps/Bundle';

import GithubCorner from 'react-github-corner';
import classnames from 'classnames';
import icon from '../img/fotm.png';
import moment from "moment/moment";
import Papa from "papaparse";
import lodash from "lodash";
import JSZip from "jszip";
import SparkMD5 from "spark-md5";
import FileSaver from "file-saver";

const bagitTXT = 'BagIt-Version: 0.97\n' +
    'Tag-File-Character-Encoding: UTF-8';

const bagitProfile =
    'BagIt-Profile-Identifier: https://freedomonthemove.org/submissions/fotm-bagit-v1.json'
    + '\n';

const Wizard = observer(class Wizard extends Component {

    stepperClass = (step) => {
        return classnames(
            'col',
            'bs-wizard-step',
            {
                'active': step === this.props.storage.currentStep,
                'complete': step < this.props.storage.currentStep,
                'disabled': step > this.props.storage.currentStep
            }
        );
    };

    back = () => {
        if (this.props.storage.currentStep === 1) {
            return;
        }

        this.props.storage.setCurrentStep(this.props.storage.currentStep - 1);
    };

    next = () => {
        if (this.props.storage.currentStep === 4) {
            return;
        }

        this.props.storage.setCurrentStep(this.props.storage.currentStep + 1);
    };

    disabled = () => {
        switch (this.props.storage.currentStep) {
            case 1:
                return this.props.storage.stepValidation[1];
            case 2:
                return this.props.storage.stepValidation[2];
            case 3:
                return this.props.storage.stepValidation[3];
            case 4:
                return this.props.storage.stepValidation[4];
            default:
                return;
        }
    };

    currentPane = () => {
        switch (this.props.storage.currentStep) {
            case 1:
                return <ContactStep storage={this.props.storage}/>;
            case 2:
                return <NewspaperInfoStep storage={this.props.storage}/>;
            case 3:
                return <AdvertisementSelectionStep storage={this.props.storage}/>;
            case 4:
                return <BundleStep storage={this.props.storage}/>;
            default:
                return (
                    <div className="row">
                        <div className="col">
                            <p className="lead text-center font-weight-normal">
                                This utility will help you prepare an archive that is ready for both import and
                                preservation.<br/>Please contact us if you require assistance.<br/><br/>
                                <button className="btn btn-lg btn-primary" type="button"
                                        onClick={this.next}>Get Started
                                </button>
                            </p>
                        </div>
                    </div>);
        }
    };

    buildZip = () => {
        let step = this;
        let zip = new JSZip();
        let dataDir = zip.folder('data');

        let manifestData = [];

        lodash.forEach(this.props.storage.newspapers.toJS(), function (newspaper) {
            let dir = 'data/' + newspaper.id + '/';
            let currentDir = dataDir.folder(newspaper.id);
            let newspaperInfo = step.buildNewspaperInfo(newspaper);

            currentDir.file('newspaper-info.txt', newspaperInfo);
            currentDir.file('advertisement-manifest.csv', newspaper.advertisementManifest.data);

            manifestData.push([SparkMD5.hash(newspaperInfo), dir + 'newspaper-info.txt']);
            manifestData.push([newspaper.advertisementManifest.checksum, dir + 'advertisement-manifest.csv']);

            lodash.forEach(newspaper.advertisements.toJS(), function (advertisement) {
                currentDir.file(advertisement.filename, advertisement.data);
                let currentFilePath = dir + advertisement.filename;
                manifestData.push([advertisement.checksum, currentFilePath]);
            });
        });

        let manifest = Papa.unparse(manifestData, {delimiter: " "});

        zip.file('bagit.txt', bagitTXT);
        zip.file('bag-info.txt', this.buildBagInfo());
        zip.file('manifest-md5.txt', manifest);

        let filename = this.props.storage.contactInfo.institutionName
            + ' - ' + this.props.storage.contactInfo.submissionIdentifier + '.zip';

        zip.generateAsync({type: "blob"})
            .then(function (blob) {
                FileSaver.saveAs(blob, filename);
            });
    };

    buildNewspaperInfo = (newspaper) => {
        let newspaperName = 'Newspaper-Name: ' + newspaper.name + '\n';
        let newspaperLocation = 'Newspaper-Location: ' + newspaper.location + '\n';
        let newspaperState = 'Newspaper-State: ' + newspaper.state;

        return newspaperName + newspaperLocation + newspaperState;
    };

    buildBagInfo = () => {
        let sourceOrg = 'Source-Organization: ' + this.props.storage.contactInfo.institutionName + '\n';
        let orgAddress = 'Organization-Address: ' + this.props.storage.contactInfo.institutionAddress + '\n';
        let contactName = 'Contact-Name: ' + this.props.storage.contactInfo.contactName + '\n';
        let contactEmail = 'Contact-Email: ' + this.props.storage.contactInfo.contactEmail + '\n';
        let externalDescription = 'External-Description: ' + this.props.storage.contactInfo.submissionDescription + '\n';
        let externalId = 'External-Identifier: ' + this.props.storage.contactInfo.submissionIdentifier + '\n';
        let baggingDate = 'Bagging-Date: ' + moment().toISOString();

        return bagitProfile + sourceOrg + orgAddress + contactName + contactEmail
            + externalDescription + externalId + baggingDate;
    };

    render() {
        return (
            <div className="App">
                <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <img className="icon" src={icon} alt="Newspaper icon"/>
                    <h1 className="d-inline-block align-middle display-4">Freedom on the Move<br/>Submission Bundler
                    </h1>
                </div>

                <div className="container">

                    {this.props.storage.currentStep > 0 && <div className="row bs-wizard pb-5">
                        <div className={this.stepperClass(1)}>
                            <div className="text-center bs-wizard-stepnum">Step 1</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Basic Info</div>
                        </div>

                        <div className={this.stepperClass(2)}>
                            <div className="text-center bs-wizard-stepnum">Step 2</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Newspaper &amp; Advertisement Info</div>
                        </div>

                        <div className={this.stepperClass(3)}>
                            <div className="text-center bs-wizard-stepnum">Step 3</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Source Material Selection</div>
                        </div>

                        <div className={this.stepperClass(4)}>
                            <div className="text-center bs-wizard-stepnum">Step 4</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Build Bundle</div>
                        </div>
                    </div>}

                    {this.currentPane()}

                    <div className="mx-auto pt-4 pb-5 clearfix">
                        {this.props.storage.currentStep > 1 &&
                        <button className="btn btn-outline-secondary float-left" type="button" onClick={this.back}>Back
                        </button>}
                        {this.props.storage.currentStep > 0 && this.props.storage.currentStep < 4 ? !this.disabled() ?
                            <button className="btn btn-primary float-right" type="button"
                                    onClick={this.next}>Next</button>
                            :
                            <button className="btn btn-primary float-right" type="button" disabled>Next</button> :
                            null}

                        {this.props.storage.currentStep === 4 && <button type="button" className="btn btn-primary float-right" onClick={this.buildZip}>Build Bundle</button>}
                    </div>

                </div>

                <GithubCorner href="https://github.com/FreedomOnTheMove/Submission-Bundler" bannerColor="#5b2d89"
                              octoColor="#fff"/>

                <div className="mx-auto text-center mb-5">
                    <small className="font-weight-light">Brought to life at <a
                        href="https://ciser.cornell.edu" className="ciser-link">CISER</a>.<br/>Made possible by generous
                        funding from
                        the<br/><a href="https://www.neh.gov/" className="neh-link">National Endowment for the
                            Humanities</a>.
                    </small>
                </div>
            </div>
        );
    }

});

export default Wizard;
