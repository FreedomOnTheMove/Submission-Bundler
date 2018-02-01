import React, {Component} from 'react';
import {observer} from 'mobx-react';

import lodash from 'lodash';

import shortid from 'shortid';

const NewspaperInfoStep = observer(class NewspaperInfoStep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            state: 'null'
        }
    }

    cancel = () => {
        this.setState({
            name: '',
            location: '',
            state: 'null'
        });
    };

    addNewspaper = () => {
        this.props.storage.addNewspaper({
            id: shortid.generate(),
            name: this.state.name,
            location: this.state.location,
            state: this.state.state
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
    };

    renderTableRows = (newspaperInfo) => {
        return (
            <tr key={newspaperInfo.id}>
                <td>{newspaperInfo.name}</td>
                <td>{newspaperInfo.location}</td>
                <td>{newspaperInfo.state}</td>
                <td><button type="button" className="btn btn-small btn-danger" onClick={() =>  this.props.storage.deleteNewspaper(newspaperInfo.id)}>Delete</button></td>
            </tr>
        );
    };

    render() {
        let tableRows = lodash.map(this.props.storage.newspaperInfo.toJS(), this.renderTableRows);

        return (
            <div>
                <div className="clearfix">
                    <div className="float-left">
                        <h3>Newspaper Info</h3>
                        <p className="lead">Here you can define one or more newspapers that you wish to supply
                            advertisements for.</p>
                    </div>

                    <div className="float-right">
                        <button type="button" className="btn btn-sm btn-outline-primary"
                                data-toggle="modal" data-target="#addNewspaper">Add Newspaper
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
                                <th scope="col">Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="modal fade" id="addNewspaper" tabIndex="-1" role="dialog"
                     aria-labelledby="addNewspaperLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="addNewspaperLabel">Add Newspaper</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="newspaperName">Newspaper Name</label>
                                            <input id="newspaperName" name="newspaperName" className="form-control"
                                                   placeholder="The Virginia Gazette" onChange={this.handleChange}
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
                                            <select id="newspaperState" name="newspaperState" className="form-control"
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
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-dismiss="modal"
                                        onClick={this.cancel}>Cancel
                                </button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={this.addNewspaper}>Add
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
