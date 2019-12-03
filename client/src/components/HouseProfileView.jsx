import React from "react";
import HeaderContainer from "../containers/HeaderContainer";

import "./css/HouseProfileView.css";
import Preview from "./Preview";

export default class HouseProfileView extends React.Component {
    constructor() {
        super()
        this.state = {
            hash: '',
            name: '',
            description: '',
            price: 0,
            sold: false,
            url: '',
            loading: false
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        if (this.props.contract) {
            const { match: { params: { value } } } = this.props;
            let data = this.props.contract.methods.getProperty(value).call({ from: this.props.accounts[0] });
            this.props.getProperty(data).then(response => {
                this.setState({
                    hash: response.value[0],
                    name: response.value[1],
                    description: response.value[2],
                    price: response.value[3] * 10 ** 18,
                    sold: response.value[4],
                    loading: true
                })
            });

            this.props.contract.events.buyProperty().on('data', async () => {
                this.props.history.push('/')
            });
        }

    }

    componentDidUpdate(prevProp, prevState) {
        if (prevProp.contract !== this.props.contract) {
            const { match: { params: { value } } } = this.props;
            let data = this.props.contract.methods.getProperty(value).call({ from: this.props.accounts[0] });
            this.props.getProperty(data).then(response => {
                this.setState({
                    hash: response.value[0],
                    name: response.value[1],
                    description: response.value[2],
                    price: response.value[3] * 10 ** 18,
                    sold: response.value[4],
                    loading: true
                })
            });
        }

        if (prevState.hash !== this.state.hash) {
            this.props.node.get(this.state.hash).then((files) => {
                const file = new window.Blob([files[0].content], { type: 'application/octet-binary' })
                this.setState({
                    url: window.URL.createObjectURL(file)
                });
            }).catch(console.log)
        }
    }

    async onClick() {
        const { match: { params: { value } } } = this.props;
        await this.props.contract.methods.buyAProperty(value).send({ from: this.props.accounts[0], value: this.state.price })
    }

    render() {
        if (!this.props.web3) {
            return (
                <Preview />
            );
        }
        return (
            <div className="profile-container">
                <HeaderContainer />
                {
                    this.state.loading ?
                        <div className="profile-card">
                            <div className="image-container">
                                <div className="image-wrapper">
                                    <img alt="House D-Real State" src={this.state.url} />
                                </div>
                            </div>
                            <div className="information-container">
                                <div className="infromation-wrapper">
                                    <p className="information-title">{this.state.name}</p>
                                    <p className="information-descrip">{this.state.description}</p>
                                    {
                                        !this.state.sold ?
                                            this.props.seller === this.props.accounts[0] ?
                                                <div className="house-status">
                                                    {
                                                        this.state.sold ?
                                                            <p className="sold-status">SOLD</p> :
                                                            <p className="sale-status">ON SALE</p>
                                                    }
                                                </div> :
                                                <div className="button-wrapper">
                                                    <button onClick={this.onClick}>BUY</button>
                                                </div> :
                                            <div className="house-status">
                                                <p className="sold-status">SOLD</p>
                                            </div>

                                    }
                                </div>
                                <div className="price-container">
                                    <p className="price">{this.state.price / 10 ** 18} ETH</p>
                                </div>
                            </div>
                        </div> :
                        <div className="profile-card">
                            <div className="image-container">
                                <div className="image-wrapper"></div>
                            </div>
                            <div className="information-container">
                                <div className="infromation-wrapper">
                                    <div className="placeholder-title"></div>
                                    <div className="information-descrip placeholder"></div>
                                    <div className="one"></div>
                                    <div className="two"></div>
                                    <div className="three"></div>
                                    <div className="button-wrapper-placeholder">
                                        <button></button>
                                    </div>
                                </div>
                                <div className="price-container">
                                    <div className="price"></div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}