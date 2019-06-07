import React, {Component} from 'react';
import {reaction} from "mobx";
import {observer} from 'mobx-react';
import FileHandler from '../FileHandler';
import lodash from 'lodash';
import uid from '@instructure/uid';
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
        };
    }

    componentWillMount() {
        reaction(
            () => this.props.storage.validationTrigger,
            () => {
                if (this.props.storage.validationTrigger.value === 2) {
                    this.validate();
                }
            }
        );
    }

    validate = () => {
        if (this.props.storage.newspapers.size < 1) {
            document.getElementById('one-newspaper-min').classList.remove('invisible');
        } else {
            document.getElementById('one-newspaper-min').classList.add('invisible');
        }
    };

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
            id: uid(),
            name: this.state.name,
            location: this.state.location,
            state: this.state.state,
            advertisementManifest: this.state.advertisementManifest
        });
        this.cancel();
        this.validate();
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
        let validNewspaperState = approve.value(this.state.state, {required: true, min: 5, max: 5}).approved;
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
                    <td className="lead mt-2">Please provide information for at least one newspaper.</td>
                </tr>;
        }

        return (
            <div>
                <div className="clearfix">
                    <div id="one-newspaper-min" className="alert alert-danger invisible" role="alert">
                        Please provide information for at least one newspaper.
                    </div>
                    <div className="float-left">
                        <h3>Newspaper Information</h3>
                        <p className="lead">Here you can give information about each newspaper that you collected from.</p>
                    </div>

                    <div className="float-right">
                        <button type="button" className="btn btn-sm btn-primary"
                                data-toggle="modal" data-target="#addInformation">Add Newspaper
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

                <div className="modal fade" id="addInformation" tabIndex="-1" role="dialog"  data-backdrop="static"
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
                                        <div className="form-group required">
                                            <label htmlFor="newspaperName">Newspaper Name</label>
                                            <input id="newspaperName" name="newspaperName"
                                                   className="form-control"
                                                   placeholder="The Virginia Gazette"
                                                   onChange={this.handleChange}
                                                   type="text" value={this.state.name}/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group required">
                                            <label htmlFor="newspaperLocation">Newspaper Location</label>
                                            <input id="newspaperLocation" name="newspaperLocation"
                                                   onChange={this.handleChange}
                                                   className="form-control"
                                                   placeholder="Williamsburg"
                                                   type="text" value={this.state.location}/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group required">
                                            <label htmlFor="newspaperState">Newspaper State</label>
                                            <select id="newspaperState" name="newspaperState"
                                                    className="form-control custom-select"
                                                    onChange={this.handleChange}
                                                    value={this.state.state}>
                                                <option value="null" disabled>Select One</option>
                                                <option value="US-AL">Alabama</option>
                                                <option value="US-AK">Alaska</option>
                                                <option value="US-AZ">Arizona</option>
                                                <option value="US-AR">Arkansas</option>
                                                <option value="US-CA">California</option>
                                                <option value="US-CO">Colorado</option>
                                                <option value="US-CT">Connecticut</option>
                                                <option value="US-DE">Delaware</option>
                                                <option value="US-DC">District of Columbia</option>
                                                <option value="US-FL">Florida</option>
                                                <option value="US-GA">Georgia</option>
                                                <option value="US-HI">Hawaii</option>
                                                <option value="US-ID">Idaho</option>
                                                <option value="US-IL">Illinois</option>
                                                <option value="US-IN">Indiana</option>
                                                <option value="US-IA">Iowa</option>
                                                <option value="US-KS">Kansas</option>
                                                <option value="US-KY">Kentucky</option>
                                                <option value="US-LA">Louisiana</option>
                                                <option value="US-ME">Maine</option>
                                                <option value="US-MD">Maryland</option>
                                                <option value="US-MA">Massachusetts</option>
                                                <option value="US-MI">Michigan</option>
                                                <option value="US-MN">Minnesota</option>
                                                <option value="US-MS">Mississippi</option>
                                                <option value="US-MO">Missouri</option>
                                                <option value="US-MT">Montana</option>
                                                <option value="US-NE">Nebraska</option>
                                                <option value="US-NV">Nevada</option>
                                                <option value="US-NH">New Hampshire</option>
                                                <option value="US-NJ">New Jersey</option>
                                                <option value="US-NM">New Mexico</option>
                                                <option value="US-NY">New York</option>
                                                <option value="US-NC">North Carolina</option>
                                                <option value="US-ND">North Dakota</option>
                                                <option value="US-OH">Ohio</option>
                                                <option value="US-OK">Oklahoma</option>
                                                <option value="US-OR">Oregon</option>
                                                <option value="US-PA">Pennsylvania</option>
                                                <option value="US-RI">Rhode Island</option>
                                                <option value="US-SC">South Carolina</option>
                                                <option value="US-SD">South Dakota</option>
                                                <option value="US-TN">Tennessee</option>
                                                <option value="US-TX">Texas</option>
                                                <option value="US-UT">Utah</option>
                                                <option value="US-VT">Vermont</option>
                                                <option value="US-VA">Virginia</option>
                                                <option value="US-WA">Washington</option>
                                                <option value="US-WV">West Virginia</option>
                                                <option value="US-WI">Wisconsin</option>
                                                <option value="US-WY">Wyoming</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group required">
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
