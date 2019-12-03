import React from "react";
import MetaMaskLogo from "../assets/metamask.jpg";
import RealEstateLogo from "../assets/Real-Estate-logo.svg";

import "./css/Preview.css";

export default class Preview extends React.Component {
    render() {
        return (
            <div className="preview-container">
                <div className="meta-mask-wrapper">
                    <div className="meta-mask-image">
                        <img alt="Metamask" src={MetaMaskLogo} />
                    </div>
                </div>

                <div className="preview-message">
                    <p>You need to have MetaMask installed to use</p>
                    <div className="preview-image-wrapper">

                        <div className="preview-image">
                            <img alt="Real Estate" src={RealEstateLogo} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}