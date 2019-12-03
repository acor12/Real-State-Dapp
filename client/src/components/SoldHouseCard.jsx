import React from "react";

import "./css/SoldHouseCard.css";

export default class SoldHouseCard extends React.Component {
    constructor() {
        super()
        this.state = {
            url: '',
            hash: '',
            name: '',
            price: 0,
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.contract) {
            let data = this.props.contract.methods.getProperty(this.props.index).call({ from: this.props.accounts[0] });
            this.props.getProperty(data).then(response => {
                this.setState({
                    hash: response.value[0],
                    name: response.value[1],
                    price: response.value[3],
                    loading: true
                })
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hash !== this.state.hash) {
            this.props.node.get(this.state.hash).then((files) => {
                const file = new window.Blob([files[0].content], { type: 'application/octet-binary' })
                this.setState({
                    url: window.URL.createObjectURL(file)
                });
            }).catch(console.log)
        }
    }
    render() {
        return (
            <div className="sold-card-container">
                <div className="sold-card-wrapper">
                    <div className="sold-image">
                        <div className="sold-wrapper">
                            <img alt="Real Estate Home" src={this.state.url} />
                        </div>
                    </div>
                    <div className="sold-info">
                        <p className="sold-title">{this.state.name}</p>
                        <p className="sold-price">{this.state.price} ETH</p>
                    </div>
                </div>
            </div>
        )
    }
}