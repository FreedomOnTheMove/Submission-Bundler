import React, {Component} from 'react';

import {StorageManager} from './storage/StorageManager';

import Wizard from './components/Wizard'

import 'bootstrap/dist/css/bootstrap.css';
import './styles/bundler.css';

import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';

const store = new StorageManager();

class App extends Component {
    render() {
        return (
            <Wizard storage={store}/>
        );
    }
}

export default App;
