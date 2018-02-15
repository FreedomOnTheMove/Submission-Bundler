import React, {Component} from 'react';
import {observer} from 'mobx-react';

import approve from 'approvejs';

const ContactStep = observer(class ContactStep extends Component {

    validate = () => {
        let contactInfo = this.props.storage.contactInfo;
        let validInstitutionName = approve.value(contactInfo.institutionName, {required: true, min: 1}).approved;
        let validInstitutionAddress = approve.value(contactInfo.institutionAddress, {required: true, min: 8}).approved;
        let validContactName = approve.value(contactInfo.contactName, {required: true, min: 1}).approved;
        let validContactEmail = approve.value(contactInfo.contactEmail, {required: true, email: true}).approved;
        let validDescription = approve.value(contactInfo.submissionDescription, {required: true, min: 5}).approved;
        let validIdentifier = approve.value(contactInfo.submissionIdentifier, {required: true, min: 1}).approved;

        if (contactInfo && validInstitutionName && validInstitutionAddress && validContactName && validContactEmail && validDescription && validIdentifier) {
            this.props.storage.setStepValidation(1, false);
        } else {
            this.props.storage.setStepValidation(1, true);
        }
    };

    handleChange = (event) => {
        this.props.storage.handleChange(event);
        this.validate();
    };

    render() {
        return (
            <div>
                <h3>Contact Information</h3>

                <form name="bundlerForm">
                    <div className="row">
                        <div className="col">
                            <div className="form-group form-label-group">
                                <input id="institutionName" name="institutionName" className="form-control"
                                       placeholder="Institution Name" required=""
                                       type="text" value={this.props.storage.contactInfo.institutionName}
                                       onChange={this.handleChange}/>
                                <label htmlFor="institutionName">Institution Name</label>
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group form-label-group">
                                <input id="institutionAddress" name="institutionAddress" className="form-control"
                                       placeholder="Institution Address" required=""
                                       type="text" value={this.props.storage.contactInfo.institutionAddress}
                                       onChange={this.handleChange}/>
                                <label htmlFor="institutionAddress">Institution Address</label>
                            </div>
                        </div>
                    </div>

                    <div className="row pb-4">
                        <div className="col">
                            <div className="form-group form-label-group">
                                <input id="contactName" name="contactName" className="form-control"
                                       placeholder="Your Name"
                                       type="text" value={this.props.storage.contactInfo.contactName} required=""
                                       onChange={this.handleChange}/>
                                <label htmlFor="contactName">Contact Name</label>
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group form-label-group">
                                <input id="contactEmail" name="contactEmail" className="form-control"
                                       placeholder="Your Email Address" required=""
                                       type="email" value={this.props.storage.contactInfo.contactEmail}
                                       onChange={this.handleChange}/>
                                <label htmlFor="contactEmail">Contact Email Address</label>
                            </div>
                        </div>
                    </div>

                    <h3>Submission Metadata</h3>

                    <div className="row">
                        <div className="col">
                            <div className="form-group form-label-group">
                                <input id="submissionDescription" name="submissionDescription" className="form-control"
                                       placeholder="Description" type="text" required=""
                                       value={this.props.storage.contactInfo.submissionDescription}
                                       onChange={this.handleChange}/>
                                <label htmlFor="submissionDescription">Description</label>
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group form-label-group">
                                <input id="submissionIdentifier" name="submissionIdentifier" className="form-control"
                                       placeholder="Submission Identifier" type="text" required=""
                                       value={this.props.storage.contactInfo.submissionIdentifier}
                                       onChange={this.handleChange}/>
                                <label htmlFor="submissionIdentifier">Submission Identifier</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    };

});

export default ContactStep;
