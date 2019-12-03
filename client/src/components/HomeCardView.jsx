import React from "react";
import { Link } from 'react-router-dom';

import "./css/HomeCardView.css";

export default class HomeCardView extends React.Component {
    constructor() {
        super()
        this.state = {
            url: '',
            hash: '',
            name: '',
            description: '',
            price: 0,
            sold: false,
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
                    description: response.value[2],
                    price: response.value[3],
                    sold: response.value[4],
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
        const { index: value } = this.props
        return (
            this.state.loading ?
                !this.state.sold ?
                    <Link to={`/house-profile/${value}`} className="home-card-container">
                        <div className="card-container" >
                            <div className="card">
                                <div className="image">
                                    <img alt="Real Estate Home" src={this.state.url} />
                                </div>
                                <div className="card-info-container">
                                    <div className="text-info">
                                        <p className="card-title">{this.state.name}</p>
                                        <p className="card-description">{this.state.description}</p>

                                    </div>
                                    <div className="price-information">
                                        <p className="card-price">{this.state.price} ETH</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link> :
                    null :
                <div className="home-card-container-placeholder">

                    <div className="card-container-placeholder">
                        <div className="card-placeholder">
                            <div className="image-placeholder">
                            </div>
                            <div className="info-placeholder">
                                <div className="info-text">
                                    <div className="title-placeholder"></div>
                                    <div className="placeholder-one"></div>
                                    <div className="placeholder-two"></div>
                                    <div className="placeholder-three"></div>
                                </div>
                                <div className="price-container-placeholder">
                                    <div className="price-placeholder"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}