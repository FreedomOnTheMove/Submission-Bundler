import React, {Component} from 'react';

class Contact extends Component {

    render() {
        return (
            <div>
                <h3>Contact Information</h3>

                <div className="row">
                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="institutionName" className="form-control" placeholder="Institution Name" type="text"/>
                            <label htmlFor="institutionName">Institution Name</label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="institutionAddress" className="form-control" placeholder="Institution Address" type="text"/>
                            <label htmlFor="institutionAddress">Institution Address</label>
                        </div>
                    </div>
                </div>

                <div className="row pb-4">
                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="contactName" className="form-control" placeholder="Your Name" type="text"/>
                            <label htmlFor="contactName">Your Name</label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="contactEmail" className="form-control" placeholder="Your Email Address" type="email"/>
                            <label htmlFor="contactEmail">Your Email Address</label>
                        </div>
                    </div>
                </div>

                <h3>Submission Metadata</h3>

                <div className="row">
                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="description" className="form-control" placeholder="Description" type="text"/>
                            <label htmlFor="description">Description</label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group form-label-group">
                            <input id="submissionIdentifier" className="form-control" placeholder="Submission Identifier" type="email"/>
                            <label htmlFor="submissionIdentifier">Submission Identifier</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}

export default Contact;
