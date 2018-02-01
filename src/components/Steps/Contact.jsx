import React, {Component} from 'react';
import {observer} from 'mobx-react';

const ContactStep = observer(class ContactStep extends Component {

    render() {
        return (
            <div>
                <h3>Contact Information</h3>

                <div className="row">
                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="institutionName" name="institutionName" className="form-control"
                                   placeholder="Institution Name"
                                   type="text" value={this.props.storage.institutionName}
                                   onChange={this.props.storage.handleChange}/>
                            <label htmlFor="institutionName">Institution Name</label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="institutionAddress" name="institutionAddress" className="form-control"
                                   placeholder="Institution Address"
                                   type="text" value={this.props.storage.institutionAddress}
                                   onChange={this.props.storage.handleChange}/>
                            <label htmlFor="institutionAddress">Institution Address</label>
                        </div>
                    </div>
                </div>

                <div className="row pb-4">
                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="contactName" name="contactName" className="form-control" placeholder="Your Name"
                                   type="text" value={this.props.storage.contactName}
                                   onChange={this.props.storage.handleChange}/>
                            <label htmlFor="contactName">Your Name</label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="contactEmail" name="contactEmail" className="form-control"
                                   placeholder="Your Email Address"
                                   type="email" value={this.props.storage.contactEmail}
                                   onChange={this.props.storage.handleChange}/>
                            <label htmlFor="contactEmail">Your Email Address</label>
                        </div>
                    </div>
                </div>

                <h3>Submission Metadata</h3>

                <div className="row">
                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="submissionDescription" name="submissionDescription" className="form-control"
                                   placeholder="Description" type="text"
                                   value={this.props.storage.submissionDescription}
                                   onChange={this.props.storage.handleChange}/>
                            <label htmlFor="submissionDescription">Description</label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="submissionIdentifier" name="submissionIdentifier" className="form-control"
                                   placeholder="Submission Identifier" type="text"
                                   value={this.props.storage.submissionIdentifier}
                                   onChange={this.props.storage.handleChange}/>
                            <label htmlFor="submissionIdentifier">Submission Identifier</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

});

export default ContactStep;
