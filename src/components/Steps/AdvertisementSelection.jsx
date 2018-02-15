import React, {Component} from 'react';
import {observer} from 'mobx-react';

import FileHandler from '../FileHandler';

import lodash from "lodash";

import shortid from 'shortid';

const AdvertisementSelectionStep = observer(class AdvertisementSelectionStep extends Component {

    handleAdvertisements = (advertisements, newspaperID) => {
        let addAdvertisement = this.props.storage.addAdvertisement;
        lodash.forEach(advertisements, function (advertisement) {
            addAdvertisement(newspaperID, {
                id: shortid.generate(),
                filename: advertisement.filename,
                data: advertisement.data,
                checksum: advertisement.checksum,
                newspaperID: newspaperID
            });
        });

        this.props.storage.validateAdvertisementUploads();
    };

    renderTableRows = (advertisement) => {
        return (
            <tr key={advertisement.id}>
                <td>{advertisement.filename}</td>
                <td>{advertisement.checksum}</td>
                <td>
                    <button type="button" className="btn btn-small btn-danger"
                            onClick={() => this.props.storage.deleteAdvertisement(advertisement.newspaperID, advertisement.id)}>Delete
                    </button>
                </td>
            </tr>
        );
    };

    uploadSection = (newspaper) => {
        return (
            <div key={newspaper.id} className="row">
                <div className="col-12">
                    <h5>{newspaper.name} Advertisements</h5>
                    <FileHandler name={newspaper.id} multiple={true}
                                 handleSelection={this.handleAdvertisements} context={newspaper.id}/>
                </div>
                <div className="col advertisement-list">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Filename</th>
                            <th scope="col">Checksum (md5)</th>
                            <th scope="col">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lodash.map(newspaper.advertisements.toJS(), this.renderTableRows)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };

    render() {
        let uploadSections = lodash.map(this.props.storage.newspapers.toJS(), this.uploadSection);

        return (
            <div>
                <div className="clearfix pb-3">
                    <h3>Advertisement Selection</h3>
                    <p className="lead">Here you can upload source material belonging to the newspapers entered in step two.</p>
                </div>
                {uploadSections}
            </div>
        )
    };

});

export default AdvertisementSelectionStep;
