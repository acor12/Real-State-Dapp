import React from "react";

import "./css/NewPropertyModal.css";

export default class NewPropertyModal extends React.Component {
    constructor() {
        super()
        this.state = {
            ipfsHash: '',
            disabled: true
        }
        this.captureFile = this.captureFile.bind(this);
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this);
    }

    captureFile(event) {
        this.file = event.target.files[0];
        let fileReader = new FileReader();

        fileReader.onload = async () => {
            this.props.node.add(Buffer.from(fileReader.result)).then((res) => {
                this.setState({
                    ipfsHash: res[0].hash,
                    disabled: false
                })
            });
        }
        fileReader.readAsArrayBuffer(this.file)
    }

    async onClick() {
        if (this.state.ipfsHash) {
            await this.props.contract.methods.newPropertyPublication(this.state.ipfsHash, this.name, this.description, this.price)
                .send({ from: this.props.accounts[0] })
            this.props.hide()
        }
    }
    onChange(e) {
        const { name, value } = e.target
        this[name] = value
    }

    render() {
        return (
            <div className="background-modal">
                <div className="new-property-modal" >
                    <div className="close-modal" onClick={this.props.hide}>X</div>
                    <div className="property-info">
                        <p className="title">New Property</p>
                        <div className="info-container">
                            <p>Name</p>
                            <input name="name" onChange={this.onChange} />
                        </div>
                        <div className="info-container">
                            <p>Description</p>
                            <textarea className="info-description" name="description" onChange={this.onChange} />
                        </div>
                        <div className="info-container">
                            <p>Price</p>
                            <input className="info-price" type="number" name="price" onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="publish-button" >
                        <div className="image-button-container">
                            <input type="file" id="file" onChange={this.captureFile} />
                            <label htmlFor="file">Select File</label>
                        </div>
                        <div className="button-new-wrapper">
                            <button disabled={this.state.disabled} onClick={this.onClick}>PUBLISH</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}