import React, {Component} from 'react';

import SparkMD5 from 'spark-md5';
import lodash from 'lodash';

class FileManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            queuedFiles: []
        };
    }

    handleFiles = () => {
        let queuedFiles = this.state.queuedFiles;
        let files = document.querySelector('#fileInput').files;

        lodash.forEach(files, function (file) {
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

    listFiles = () => {
        lodash.forEach(this.state.queuedFiles, function (file) {
            console.log(file.filename);
        })
    };

    render() {
        return (
            <div>
                <input id="fileInput" type="file" onChange={this.handleFiles} multiple/>
                <button className="btn btn-info" type="button" onClick={this.listFiles}>List Files</button>
            </div>
        )
    };

}

export default FileManager;
