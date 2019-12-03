import React from "react";
import { Link } from 'react-router-dom';
import RealEstateLogo from "../assets/Real-Estate-logo.svg";
import ModalBalanceContainer from "../containers/ModalBalanceContainer";
import NewPropertyModalCotainer from "../containers/NewPropertyModalCotainer";

import "./css/Header.css";

export default class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            balanceModal: false
        }
        this.displayModal = this.displayModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.displayBalance = this.displayBalance.bind(this);
        this.closeBalance = this.closeBalance.bind(this);
    }

    displayModal() {
        this.setState({
            modal: true,
        })
    }
    hideModal() {
        this.setState({
            modal: false
        })
    }
    displayBalance() {
        this.setState({
            balanceModal: true
        })
    }
    closeBalance() {
        this.setState({
            balanceModal: false
        })
    }
    render() {
        return (
            <div className="header">
                {
                    this.props.seller.toLowerCase() === this.props.accounts[0].toLowerCase() ? (
                        <div className="header-container">
                            <Link to="/" className="logo-container">
                                <img alt="Real Estate" src={RealEstateLogo} />
                            </Link>
                            <div className="header-menu">
                                {
                                    !this.state.balanceModal ?
                                        <div className="balance" onClick={this.displayBalance}>
                                            <p>BALANCE</p>
                                        </div> :
                                        <div className="balance">
                                            <p>BALANCE</p>
                                            <ModalBalanceContainer hide={this.closeBalance} />
                                        </div>
                                }
                                {
                                    !this.state.modal ? (
                                        <div className="new-property" onClick={this.displayModal}>
                                            <p>NEW PROPERTY</p>
                                        </div>
                                    ) :
                                        <div className="new-property">
                                            <p>NEW PROPERTY</p>
                                            <NewPropertyModalCotainer hide={this.hideModal} node={this.props.node} />
                                        </div>
                                }
                            </div>
                        </div>

                    ) : (
                            <div className="header-container">
                                <Link to="/" className="logo-container">
                                    <img alt="Real Estate" src={RealEstateLogo} />
                                </Link>
                            </div>
                        )

                }
            </div>
        )
    }
}