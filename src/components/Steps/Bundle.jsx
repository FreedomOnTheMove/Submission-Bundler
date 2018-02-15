import React, {Component} from 'react';
import {observer} from 'mobx-react';
import lodash from "lodash";

const BundleStep = observer(class BundleStep extends Component {

    renderTableRows = (newspaper) => {
        return (
            <tr key={newspaper.id}>
                <td>{newspaper.name}</td>
                <td>{newspaper.location}</td>
                <td>{newspaper.state}</td>
                <td>{newspaper.advertisementManifest.filename}</td>
                <td>{newspaper.advertisements.size}</td>
            </tr>
        );
    };

    render() {
        let tableRows;

        if (this.props.storage.newspapers.size > 0) {
            tableRows = lodash.map(this.props.storage.newspapers.toJS(), this.renderTableRows);
        }

        return (
            <div>
                <h3>Bundle Creation Summary</h3>
                <dl className="row mt-3">
                    <dt className="col-sm-3">Institution Name</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.institutionName}</dd>

                    <dt className="col-sm-3">Institution Address</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.institutionAddress}</dd>

                    <dt className="col-sm-3">Contact Name</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.contactName}</dd>

                    <dt className="col-sm-3">Contact Email Address</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.contactEmail}</dd>

                    <dt className="col-sm-3">Submission Description</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.submissionDescription}</dd>

                    <dt className="col-sm-3">Submission Identifier</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.submissionIdentifier}</dd>
                </dl>

                <h4>Source Material Summary</h4>
                <div className="row">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">State</th>
                            <th scope="col">Advertisement Manifest</th>
                            <th scope="col">Source Material File Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };

});

export default BundleStep;