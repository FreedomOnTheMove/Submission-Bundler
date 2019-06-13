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
                <h2>Bundle Creation Summary</h2>
                <dl className="row mt-3">

                    <dt className="col-sm-3">Unique Submission Identifier</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.get('submissionIdentifier')}</dd>

                    <dt className="col-sm-3">Institution Name</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.get('institutionName')}</dd>

                    <dt className="col-sm-3">Institution Address</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.get('institutionAddress')}</dd>

                    <dt className="col-sm-3">Contact Name</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.get('contactName')}</dd>

                    <dt className="col-sm-3">Contact Email Address</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.get('contactEmail')}</dd>

                    <dt className="col-sm-3">Submission Description</dt>
                    <dd className="col-sm-9">{this.props.storage.contactInfo.get('submissionDescription')}</dd>

                </dl>

                <h3>Source Material Summary</h3>
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
