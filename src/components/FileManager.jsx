import React, {Component} from 'react';

import SparkMD5 from 'spark-md5';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import fe from 'lodash.foreach';

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
            <div>
                <input id="fileInput" type="file" onChange={this.handleFiles} multiple/>
                <button className="btn btn-info" type="button" onClick={this.listFiles}>List Files</button>
            </div>
        )
    }

}

export default FileManager;
