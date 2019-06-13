import React, {Component} from 'react';
import {reaction} from 'mobx';
import {observer} from 'mobx-react';

import approve from 'approvejs';

const ContactStep = observer(class ContactStep extends Component {

    componentDidMount() {
        reaction(
            () => this.props.storage.validationTrigger,
            () => {
                if (this.props.storage.validationTrigger.value === 1) {
                    this.validate();
                    this.printValidationErrors();
                }
            }
        );
    }

    validate = () => {
        let contactInfo = this.props.storage.contactInfo;
        let validInstitutionName = approve.value(contactInfo.get('institutionName'), {required: true, min: 1}).approved;
        let validInstitutionAddress = approve.value(contactInfo.get('institutionAddress'), {
            required: true,
            min: 1
        }).approved;
        let validContactName = approve.value(contactInfo.get('contactName'), {required: true, min: 1}).approved;
        let validContactEmail = approve.value(contactInfo.get('contactEmail'), {required: true, email: true}).approved;

        if (contactInfo && validInstitutionName && validInstitutionAddress &&
            validContactName && validContactEmail) {
            this.props.storage.setStepValidation(1, false);
        } else {
            this.props.storage.setStepValidation(1, true);
        }
    };

    printValidationErrors = () => {
        let form = document.getElementsByClassName('needs-validation')[0];
        let valid = form.checkValidity();
        if (!valid) {
            form.classList.add('was-validated');
        }
    };

    handleChange = (event) => {
        this.props.storage.handleChange(event);
        this.validate();
    };

    render() {
        return (
            <div>
                <h2>Contact Information</h2>

                <form name="bundlerForm" className="needs-validation" noValidate>
                    <div className="row">
                        <div className="col pt-1">
                            <div className="form-group form-label-group required">
                                <label htmlFor="institutionName">Institution Name</label>
                                <input id="institutionName" name="institutionName" className="form-control"
                                       placeholder="Institution Name" required
                                       type="text" value={this.props.storage.contactInfo.get('institutionName')}
                                       onChange={this.handleChange}/>
                                <div className="valid-feedback">
                                    {this.props.storage.contactInfo.get('institutionName')} will appear in the citation information.
                                </div>
                                <div className="invalid-feedback">
                                    Please provide an institution name.
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group form-label-group required">
                                <label htmlFor="institutionAddress">Institution Address</label>
                                <input id="institutionAddress" name="institutionAddress" className="form-control"
                                       placeholder="Institution Address" required
                                       type="text" value={this.props.storage.contactInfo.get('institutionAddress')}
                                       onChange={this.handleChange}/>
                                <div className="valid-feedback">
                                    This address will appear alongside the institution name in the citation information.
                                </div>
                                <div className="invalid-feedback">
                                    Please provide an address.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pb-4">
                        <div className="col">
                            <div className="form-group form-label-group required">
                                <label htmlFor="contactName">Contact Name</label>
                                <input id="contactName" name="contactName" className="form-control"
                                       placeholder="Contact Name"
                                       type="text" value={this.props.storage.contactInfo.get('contactName')} required
                                       onChange={this.handleChange}/>
                                <div className="valid-feedback">
                                    Nice to meet you {this.props.storage.contactInfo.get('contactName')}!<br/>
                                    We just need to know who to contact if we have a question about this submission.<br/>
                                    Your name will not be shared.
                                </div>
                                <div className="invalid-feedback">
                                    Please provide the point of contact's name.
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group form-label-group required">
                                <label htmlFor="contactEmail">Contact Email Address</label>
                                <input id="contactEmail" name="contactEmail" className="form-control"
                                       placeholder="Your Email Address" required
                                       type="email" value={this.props.storage.contactInfo.get('contactEmail')}
                                       onChange={this.handleChange}/>
                                <div className="valid-feedback">
                                    We will email {this.props.storage.contactInfo.get('contactEmail')} if we need to contact you about this submission.<br/>Your email address will not be shared.
                                </div>
                                <div className="invalid-feedback">
                                    Please provide the point of contact's email.
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2>Submission Metadata</h2>

                    <div className="row pt-1">
                        <div className="col">
                            <div className="form-group form-label-group required">
                                <label htmlFor="submissionDescription">Description</label>
                                <input id="submissionDescription" name="submissionDescription" className="form-control"
                                       placeholder="Describe what are you submitting to the project." type="text" required
                                       value={this.props.storage.contactInfo.get('submissionDescription')}
                                       onChange={this.handleChange}/>
                                <div className="valid-feedback">
                                    Great! We are both excited and grateful that you are sending this material to us.
                                </div>
                                <div className="invalid-feedback">
                                    Please provide a brief description of this submission.
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        )
    };

});

export default ContactStep;
