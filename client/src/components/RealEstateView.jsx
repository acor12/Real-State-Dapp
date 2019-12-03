import React from "react";
import Preview from "./Preview";
import HeaderContainer from "../containers/HeaderContainer";
import HomeCardViewContainer from "../containers/HomeCardViewContainer";
import SoldHouseCardContainer from "../containers/SoldHouseCardContainer";

import "./css/RealEstateView.css";

export default class RealEstateView extends React.Component {

    render() {
        if (!this.props.web3) {
            return (
                <Preview />
            );
        }
        return (
            this.props.soldProperties ?
                this.props.soldProperties.length === 0 ? (
                    <div className="App">
                        <div className="real-estate-wrapper">
                            <HeaderContainer />
                            <div className="card-house-container">
                                {
                                    this.props.count ?
                                        this.props.count.length > 0 ?
                                            this.props.count.map((data, index) => {
                                                return <HomeCardViewContainer index={index} />
                                            }) :
                                            <div className="card-notification">
                                                <p>
                                                    We sorry! we have no houses for sell yet!
                                                </p>
                                            </div> : null
                                }
                            </div>
                        </div>
                    </div>
                ) :
                    <div className="app-sold">
                        <div className="real-estate-wrapper-sold">
                            <HeaderContainer />
                            <div className="card-house-container-sold">
                                <div style={{ width: '85%', display: 'flex' }}>

                                    {
                                        this.props.count ?
                                            this.props.count.length > 0 ?
                                                this.props.count.map((data, index) => {
                                                    return <HomeCardViewContainer index={index} />
                                                }) :
                                                <div className="card-notification">
                                                    <p>
                                                        We sorry! we doesn't have house for sell yet!
                                                    </p>
                                                </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="sold-house-container">
                            <p className="recent-sales">Recent Sales</p>
                            {
                                this.props.soldProperties.map((data) => {
                                    return <SoldHouseCardContainer index={data} />
                                })
                            }
                        </div>
                    </div> : null
        )
    }
}