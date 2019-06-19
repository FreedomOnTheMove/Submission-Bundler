import React, {Component} from 'react';
import SparkMD5 from "spark-md5";

import $ from 'jquery';
import loading from '../img/loading.gif';

class FileHandler extends Component {

    handleFiles = () => {
        $('#loadingModal').modal('show');
        let querySelector = '#' + this.props.name;
        let callback = this.props.handleSelection;
        let context = this.props.context;
        let queuedFiles = [];
        let fileList = document.querySelector(querySelector).files;

        let files = [];

        for (let i = 0; i < fileList.length; i++) {
            files.push(fileList.item(i));
        }

        let promises = files.map(function (file) {
            return new Promise(function (resolve, reject) {
                let reader = new FileReader();
                reader.onload = (function (file) {
                    return function (event) {
                        let spark = new SparkMD5.ArrayBuffer();
                        spark.append(event.target.result);
                        let qf = {"filename": file.name, "data": event.target.result, "checksum": spark.end()};
                        queuedFiles.push(qf);
                        resolve();
                    };
                })(file);

                reader.onerror = (function () {
                    return function (event) {
                        console.error(event);
                        reject();
                    };
                })(file);

                reader.readAsArrayBuffer(file);
            });
        });

        Promise.all(promises).then(function () {
            $('#loadingModal').modal('hide');
            callback(queuedFiles, context);
        });
    };

    render() {
        return (
            <div>
                <div id="loadingModal" className="modal" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="modal-title">Selected files are being processed.</p>
                            </div>
                            <div className="modal-body text-center">
                                <img src={loading} alt='Processing files' />
                            </div>
                        </div>
                    </div>
                </div>
                <input required={this.props.required} id={this.props.name} className="form-control-file" type="file" name={this.props.name}
                       accept={this.props.accept}
                       onChange={this.handleFiles} multiple={this.props.multiple} value={this.props.value}/>

                {this.props.required ? <div className="invalid-feedback">
                    {this.props.invalidFeedback}
                </div> : null}

            </div>
        )
    };

}

export default FileHandler;
