import React, {Component} from 'react';
import {observer} from 'mobx-react';

import FileHandler from '../FileHandler';

import lodash from "lodash";

import uid from '@instructure/uid';
import {reaction} from 'mobx';

const AdvertisementSelectionStep = observer(class AdvertisementSelectionStep extends Component {

    componentDidMount() {
        reaction(
            () => this.props.storage.validationTrigger,
            () => {
                if (this.props.storage.validationTrigger.value === 3) {
                    this.validate();
                }
            }
        );
    }

    handleAdvertisements = (advertisements, newspaperID) => {
        let addAdvertisement = this.props.storage.addAdvertisement;
        lodash.forEach(advertisements, function (advertisement) {
            addAdvertisement(newspaperID, {
                id: uid(),
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
                            onClick={() => {
                                this.props.storage.deleteAdvertisement(advertisement.newspaperID, advertisement.id);
                                this.validate();
                            }}>Delete
                    </button>
                </td>
            </tr>
        );
    };

    validate = () => {
        let eachPaperHasAnAdd = true;
        this.props.storage.validateAdvertisementUploads();

        lodash.forEach(this.props.storage.newspapers.toJS(), function (newspaper) {
            if (newspaper.advertisements.size < 1) {
                eachPaperHasAnAdd = false;
            }
        });

        if (!eachPaperHasAnAdd) {
            document.getElementById('one-ad-per-paper').classList.remove('invisible');
        } else {
            document.getElementById('one-ad-per-paper').classList.add('invisible');
        }
    };

    uploadSection = (newspaper) => {
        return (
            <div key={newspaper.id} className="row">
                <div className="col-12">
                    <label htmlFor={newspaper.id}>
                        <h3>{newspaper.name} Advertisements</h3>
                    </label>
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
                <div id="one-ad-per-paper" className="alert alert-danger invisible" role="alert">
                    Please upload at least one advertisement for each newspaper specified in step two.
                </div>
                <div className="clearfix pb-3">
                    <h2>Advertisement Selection</h2>
                    <p className="lead">Here you can upload advertisement scans from the newspapers entered in step two.</p>
                </div>
                {uploadSections}
            </div>
        )
    };

});

export default AdvertisementSelectionStep;
