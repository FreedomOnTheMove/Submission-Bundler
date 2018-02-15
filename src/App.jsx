import React, {Component} from 'react';

import * as mobx from 'mobx';

import {StorageManager} from './storage/StorageManager';

import Wizard from './components/Wizard'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/bundler.css';

import 'jquery/dist/jquery.js';
import 'parsleyjs/dist/parsley.min.js';
import 'bootstrap/dist/js/bootstrap.js';

const store = new StorageManager();

mobx.useStrict(true);

class App extends Component {
    render() {
        return (
            <Wizard storage={store}/>
        );
    }
}

export default App;
