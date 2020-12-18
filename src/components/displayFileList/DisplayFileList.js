import { Card, Icon, SVG } from "@kiwiwealth/ui";
import React, { Component } from "react";
import DatabaseService from "services/DatabaseService";
import StorageService from "services/StorageService";

class DisplayFileList extends Component {
    state = { files: [] }

    constructor(props) {
        super(props);
        this.loadFilesToState = this.loadFilesToState.bind(this);
        this.loadFiles = this.loadFiles.bind(this);
    }

    componentDidMount() {
        const { memberId } = this.props;

        DatabaseService.getRequestsByMemberId('KWKS12345').on("value", this.loadFiles);

    }
    loadFiles(snapshot) {
        let files = [];

        const snapshotData = snapshot.val();
        const keys = Object.keys(snapshotData);
        if (keys && keys.length > 0) {
            keys.forEach((requestKey) => {
                console.log(snapshotData[requestKey])
                const requestData = snapshotData[requestKey];
                const fileKeys = Object.keys(requestData.files);

                if (fileKeys && fileKeys.length > 0) {
                    fileKeys.forEach((key) => {

                        files.push(requestData.files[key].name);
                    });
                    this.setState({ files });

                }
            });
        }
    }

    loadFilesToState(res) {
        let files = [];
        res.items.forEach((f) => {
            files.push(f.name);
            this.setState({ files });
        });
    }
    downloadOnClick(fileName) {
        console.log('asdasdasd', fileName);
        StorageService.downloadFile(fileName);
    }
    render() {

        const { files } = this.state;
        return (
            <>
                <div className="u-margin-bottom u-margin-top" >
                    {files.length > 0 && (<Card>
                        <h3>Files already uploaded</h3>
                        <hr />
                        <ul className="list-unstyled">
                            {files.map((file) => {
                                const fileName = file.toString();
                                return (<li key={fileName}>
                                    <Icon
                                        spacing="right"
                                        size="small"
                                        icon={SVG.Download}
                                    />

                                    <a href="#" onClick={() => this.downloadOnClick(fileName)}>{fileName}</a>
                                </li>)
                            })}

                        </ul>
                    </Card>)
                    }
                </div>
            </>
        );
    }
}
export default DisplayFileList;
