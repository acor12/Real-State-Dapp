import React from "react";

import "./css/ModalBalance.css";

export default class ModalBalance extends React.Component {
    constructor() {
        super()
        this.state = {
            balance: 0,
            disable: false,
        }
        this.withdrawal = this.withdrawal.bind(this);
        this.setButton = this.setButton.bind(this);
    }

    componentDidMount() {
        let balance = this.props.contract.methods.getBalance().call({ from: this.props.accounts[0] });
        this.props.getBalance(balance).then(response => {
            this.setState({
                balance: response.value / 10 ** 18
            })
        })

        this.props.contract.events.newBalance().on('data', () => {
            const balance = this.props.contract.methods.getBalance().call({ from: this.props.accounts[0] });
            this.props.getBalance(balance).then(response => {
                this.setState({
                    balance: response.value / 10 ** 18
                })
            })
        })
    }

    async withdrawal() {
        await this.props.contract.methods.transferBalance().send({ from: this.props.accounts[0] })
    }

    setButton() {
        if (this.state.balance === 0) {
            return true
        }
        return false
    }

    render() {
        return (
            <div className="balance-modal-container">
                <div className="balance-modal">
                    <div className="balance-modal-wrapper">
                        <div className="close-balance-modal" onClick={this.props.hide}>
                            <p>X</p>
                        </div>
                        <div className="balance-modal-info">
                            <p className="balance-title">Balance:</p>
                            <p className="balance-amount">{this.state.balance} ETH</p>
                        </div>
                        <div className="balance-modal-button">
                            <div className="withdrawal-wrapper">
                                <button disabled={this.setButton()} onClick={this.withdrawal}>Withdrawal</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}