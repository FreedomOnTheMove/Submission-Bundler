import React, {Component} from 'react';
import {observer} from 'mobx-react';

import ContactStep from './Steps/Contact';
import NewspaperInfoStep from './Steps/NewspaperInfo';
import AdvertisementSelectionStep from './Steps/AdvertisementSelection';

import classnames from 'classnames';

import icon from '../img/fotm.png';

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
                return false;
            case 2:
                return false; //this.props.storage.newspaperInfo.size === 0;
            case 3:
                return false;
            case 4:
                return false;
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
                return <span>oh hi mark</span>;
            default:
                return;
        }
    };

    render() {
        return (
            <div className="App">

                <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <img className="icon" src={icon} alt="Newspaper icon"/>
                    <h1 className="d-inline-block align-middle display-4">Freedom on the Move<br/>Submission Bundler
                    </h1>
                    <p className="lead">This utility will help you prepare an archive that is ready for both import and
                        preservation.<br/>Please contact us if you require assistance.</p>
                </div>

                <div className="container">

                    <div className="row bs-wizard pb-4">
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
                            <div className="bs-wizard-info text-center">Newspaper Info</div>
                        </div>

                        <div className={this.stepperClass(3)}>
                            <div className="text-center bs-wizard-stepnum">Step 3</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Advertisement Selection</div>
                        </div>

                        <div className={this.stepperClass(4)}>
                            <div className="text-center bs-wizard-stepnum">Step 4</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Build Bundle</div>
                        </div>
                    </div>

                    {this.currentPane()}

                    <div className="mx-auto pt-4 pb-5 clearfix">
                        <button className="btn btn-outline-secondary float-left" type="button" onClick={this.back}>Back
                        </button>
                        &nbsp;&nbsp;
                        {this.props.storage.currentStep < 4 && !this.disabled() ?
                            <button className="btn btn-primary float-right" type="button"
                                    onClick={this.next}>Next</button>
                            : <button className="btn btn-primary float-right" type="button" disabled>Next</button>}
                    </div>

                </div>

            </div>
        );
    }

});

export default Wizard;
