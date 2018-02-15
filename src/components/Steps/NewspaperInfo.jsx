import React, {Component} from 'react';
import {observer} from 'mobx-react';
import FileHandler from '../FileHandler';
import lodash from 'lodash';
import shortid from 'shortid';

import approve from 'approvejs';

const NewspaperInfoStep = observer(class NewspaperInfoStep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            state: 'null',
            advertisementManifest: null,
            addNewspaperButtonDisabled: true
        }
    }

    cancel = () => {
        this.setState({
            name: '',
            location: '',
            state: 'null',
            advertisementManifest: null,
            addNewspaperButtonDisabled: true
        });

        document.getElementsByName("advertisementManifest")[0].value = "";
    };

    addNewspaper = () => {
        this.props.storage.addNewspaper({
            id: shortid.generate(),
            name: this.state.name,
            location: this.state.location,
            state: this.state.state,
            advertisementManifest: this.state.advertisementManifest
        });
        this.cancel();
    };

    handleChange = (event) => {
        let value = event.target.value;
        switch (event.target.name) {
            case 'newspaperName':
                this.setState({
                    name: value
                });
                break;
            case 'newspaperLocation':
                this.setState({
                    location: value
                });
                break;
            case 'newspaperState':
                this.setState({
                    state: value
                });
                break;
            default:
                break;
        }
        this.validateAddNewspaper();
    };

    handleManifiestSelection = (manifest) => {
        this.setState({
            advertisementManifest: manifest[0]
        });
        this.validateAddNewspaper();
    };

    validateAddNewspaper = () => {
        let validNewspaperName = approve.value(this.state.name, {required: true, min: 1}).approved;
        let validNewspaperLocation = approve.value(this.state.location, {required: true, min: 1}).approved;
        let validNewspaperState = approve.value(this.state.state, {required: true, min: 2, max: 2}).approved;
        let validAdvertisementManifest = this.state.advertisementManifest != null;

        if (validNewspaperName && validNewspaperLocation && validNewspaperState && validAdvertisementManifest) {
            this.setState({
                addNewspaperButtonDisabled: false
            });
        } else {
            this.setState({
                addNewspaperButtonDisabled: true
            });
        }
    };

    renderTableRows = (newspaper) => {
        return (
            <tr key={newspaper.id}>
                <td>{newspaper.name}</td>
                <td>{newspaper.location}</td>
                <td>{newspaper.state}</td>
                <td>{newspaper.advertisementManifest.filename}</td>
                <td>
                    <button type="button" className="btn btn-small btn-danger"
                            onClick={() => this.props.storage.deleteNewspaper(newspaper.id)}>Delete
                    </button>
                </td>
            </tr>
        );
    };

    render() {
        let tableRows;

        if (this.props.storage.newspapers.size > 0) {
            tableRows = lodash.map(this.props.storage.newspapers.toJS(), this.renderTableRows);
        } else {
            tableRows =
                <tr>
                    <td className="lead mt-2">Please enter in information for at least one newspaper.</td>
                </tr>;
        }

        return (
            <div>
                <div className="clearfix">
                    <div className="float-left">
                        <h3>Newspaper &amp; Advertisement Info</h3>
                        <p className="lead">Here you can define newspaper &amp; advertisement information for
                            the source
                            material you are about to
                            provide.</p>
                    </div>

                    <div className="float-right">
                        <button type="button" className="btn btn-sm btn-primary"
                                data-toggle="modal" data-target="#addInformation">Add Information
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">State</th>
                                <th scope="col">Advertisement Manifest</th>
                                <th scope="col">Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="modal fade" id="addInformation" tabIndex="-1" role="dialog"
                     aria-labelledby="addInformationLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="addInformationLabel">Add
                                    Newspaper &amp; Advertisement
                                    Info</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="newspaperName">Newspaper Name</label>
                                            <input id="newspaperName" name="newspaperName"
                                                   className="form-control"
                                                   placeholder="The Virginia Gazette"
                                                   onChange={this.handleChange}
                                                   type="text" value={this.state.name}/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="newspaperLocation">Newspaper Location</label>
                                            <input id="newspaperLocation" name="newspaperLocation"
                                                   onChange={this.handleChange}
                                                   className="form-control"
                                                   placeholder="Williamsburg"
                                                   type="text" value={this.state.location}/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="newspaperState">Newspaper State</label>
                                            <select id="newspaperState" name="newspaperState"
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    value={this.state.state}>
                                                <option value="null" disabled>Select One</option>
                                                <option value="AL">Alabama</option>
                                                <option value="AK">Alaska</option>
                                                <option value="AZ">Arizona</option>
                                                <option value="AR">Arkansas</option>
                                                <option value="CA">California</option>
                                                <option value="CO">Colorado</option>
                                                <option value="CT">Connecticut</option>
                                                <option value="DE">Delaware</option>
                                                <option value="DC">District of Columbia</option>
                                                <option value="FL">Florida</option>
                                                <option value="GA">Georgia</option>
                                                <option value="HI">Hawaii</option>
                                                <option value="ID">Idaho</option>
                                                <option value="IL">Illinois</option>
                                                <option value="IN">Indiana</option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">Kansas</option>
                                                <option value="KY">Kentucky</option>
                                                <option value="LA">Louisiana</option>
                                                <option value="ME">Maine</option>
                                                <option value="MD">Maryland</option>
                                                <option value="MA">Massachusetts</option>
                                                <option value="MI">Michigan</option>
                                                <option value="MN">Minnesota</option>
                                                <option value="MS">Mississippi</option>
                                                <option value="MO">Missouri</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NV">Nevada</option>
                                                <option value="NH">New Hampshire</option>
                                                <option value="NJ">New Jersey</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="NY">New York</option>
                                                <option value="NC">North Carolina</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">Oklahoma</option>
                                                <option value="OR">Oregon</option>
                                                <option value="PA">Pennsylvania</option>
                                                <option value="RI">Rhode Island</option>
                                                <option value="SC">South Carolina</option>
                                                <option value="SD">South Dakota</option>
                                                <option value="TN">Tennessee</option>
                                                <option value="TX">Texas</option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">Vermont</option>
                                                <option value="VA">Virginia</option>
                                                <option value="WA">Washington</option>
                                                <option value="WV">West Virginia</option>
                                                <option value="WI">Wisconsin</option>
                                                <option value="WY">Wyoming</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="advertisementManifest">Advertisement
                                                Manifest</label>
                                            <FileHandler name="advertisementManifest" accept=".csv"
                                                         handleSelection={this.handleManifiestSelection}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-dismiss="modal"
                                        onClick={this.cancel}>Cancel
                                </button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={this.addNewspaper} disabled={this.state.addNewspaperButtonDisabled}>Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    };

});

export default NewspaperInfoStep;
