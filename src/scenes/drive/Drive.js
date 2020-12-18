
import { Button, InputFile } from '@kiwiwealth/ui';
import DisplayFileList from 'components/displayFileList/DisplayFileList';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import StorageService from 'services/StorageService';
class Drive extends Component {
    state = {
        filesToUpload: [],
        memberId: 'KWKS12345',
    }

    constructor(props) {
        super(props);
        this.fileUploadOnChange = this.fileUploadOnChange.bind(this);
        this.uploadOnClick = this.uploadOnClick.bind(this);
    }

    fileUploadOnChange(files) {
        this.setState({ 'filesToUpload': files });
    }

    loadFilesToState(res) {
        let files = [];
        res.items.forEach((f) => {
            files.push(f.name);
            this.setState({ 'uploadedFiles': files });
        });
    }
    componentDidMount() {
        const { requestId } = this.props.match.params;

    }

    uploadOnClick() {
        const { filesToUpload, memberId } = this.state;
        const { requestId } = this.props.match.params;

        StorageService.upload(requestId, memberId, filesToUpload);
    }

    render() {
        const { memberId } = this.state;

        return (
            <>
                <h1>DocSpace - Upload your files here</h1>

                <DisplayFileList memberId={memberId} />
                <form>
                    <InputFile
                        maxNumOfFiles={5}
                        modalAppElement="#root"
                        label={
                            'Please upload your documents in a secured manner'
                        }
                        labelStyle="lowercase"
                        id="input-file-test"
                        btnText="Upload very important and private files"
                        onChange={files => {
                            this.fileUploadOnChange(files);
                        }}
                        error
                        errorMessage="pps"
                        helpText={
                            <>
                                Accepted file formats: PNG, JPEG, PDF.
                            <br />
                                You can upload one file up to a maximum size of 20Mb.
                        </>
                        }
                    />
                    <div>
                        <Button onClick={this.uploadOnClick}>
                            Send
                    </Button>
                    </div>
                </form>
            </>
        )
    }
}

export default withRouter(Drive);