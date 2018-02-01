import React, {Component} from 'react';

import SparkMD5 from 'spark-md5';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import fe from 'lodash.foreach';
import classNames from 'classnames';

import ContactStep from './steps/contact';

import icon from './img/fotm.png';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            queuedFiles: [],
            step: 1
        };
    }

    stepperClass = (step) => {
        console.log(step);
        return classNames(
            'col',
            'bs-wizard-step',
            {
                'active' : step  ===  this.state.step,
                'completed' : step < this.state.step,
                'disabled': step > this.state.step
            }
        );
    };

    increment = () => {
        this.setState({
           step: this.state.step + 1
        });
    }

    handleFiles = () => {
        let queuedFiles = this.state.queuedFiles;
        let files = document.querySelector('#fileInput').files;

        fe(files, function (file) {
            let reader = new FileReader();
            reader.onload = (function (file) {
                return function (event) {
                    let spark = new SparkMD5.ArrayBuffer();
                    spark.append(event.target.result);

                    console.log('MD5 (' + file.name + ') = ' + spark.end());

                    let qf = {"filename": file.name, "data": event.target.result};
                    queuedFiles.push(qf);
                };
            })(file);

            reader.readAsArrayBuffer(file);
        });
    };

    buildZip = () => {
        let zip = new JSZip();
        let files = this.state.queuedFiles;

        fe(files, function (file) {
            zip.file(file.filename, file.data);
        });

        zip.generateAsync({type: "blob"})
            .then(function (blob) {
                FileSaver.saveAs(blob, "test.zip");
            });
    };

    listFiles = () => {
        fe(this.state.queuedFiles, function (file) {
            console.log(file.filename);
        })
    };

    render() {
        return (
            <div className="App">

                <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <img className="icon" src={icon} alt="Newspaper icon"/>
                    <h1 className="d-inline-block align-middle display-4">Freedom on the Move<br/>Submission Bundler
                    </h1>
                    <p className="lead">This utility will help you prepare an archive that is ready for both import and
                        preserval.<br/>Please contact us if you require assistance.</p>
                </div>

                <div className="container">

                    <div className="row bs-wizard pb-4">
                        <div className={this.stepperClass(1)}>
                            <div className="text-center bs-wizard-stepnum">Step 1</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Basic Info</div>
                        </div>

                        <div className={this.stepperClass(2)}>
                            <div className="text-center bs-wizard-stepnum">Step 2</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Newspaper Info</div>
                        </div>

                        <div className={this.stepperClass(3)}>
                            <div className="text-center bs-wizard-stepnum">Step 3</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Advertisement Selection</div>
                        </div>

                        <div className={this.stepperClass(4)}>
                            <div className="text-center bs-wizard-stepnum">Step 4</div>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="bs-wizard-dot"></span>
                            <div className="bs-wizard-info text-center">Build Bundle</div>
                        </div>
                    </div>

                    <ContactStep/>

                </div>

                <input id="fileInput" type="file" onChange={this.handleFiles} multiple/>

                <button className="btn btn-primary" type="button" onClick={this.buildZip}>Bundle</button>
                <button className="btn btn-info" type="button" onClick={this.listFiles}>List Files</button>
                <button type="button" onClick={this.increment}>Increment</button>

            </div>
        );
    }
}

export default App;
