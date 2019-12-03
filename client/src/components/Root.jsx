import React from 'react';
import getWeb3 from "../getWeb3";
import RealEstateContract from "../contracts/RealEstate.json";

export default class Root extends React.Component {

    async componentDidMount() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = RealEstateContract.networks[networkId];
            const contract = await new web3.eth.Contract(
                RealEstateContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            window.ethereum.on('accountsChanged', this.props.changeAccount);
            // Get events
            contract.events.newProperty().on('data', async () => {
                const count = await contract.methods.propertiesCount().call();
                this.props.newPropertiesCount(count)
            });
            contract.events.getSoldProperties().on('data', async () => {
                const soldProperties = await contract.methods.soldPropertiesCount().call();
                this.props.soldPropertiesCount(soldProperties)
            });
            // Get seller
            const seller = await contract.methods.seller().call();
            // Get properties count
            const count = await contract.methods.propertiesCount().call();
            // Get sold properties count
            const soldProperties = await contract.methods.soldPropertiesCount().call();
            // Create Ipfs node
            const node = await window.Ipfs.create();

            this.props.setContract(web3, accounts, contract, seller, node)
            this.props.getPropertiesCount(count, soldProperties)
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}