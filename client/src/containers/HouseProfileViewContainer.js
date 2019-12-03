import { connect } from 'react-redux';
import HouseProfileView from '../components/HouseProfileView';
import { getProperty } from "../redux/realEstateContractActions";

export default connect(
    (state) => {
        return {
            web3: state.realEstateContractReducer.web3,
            contract: state.realEstateContractReducer.contract,
            accounts: state.realEstateContractReducer.accounts,
            node: state.realEstateContractReducer.node,
            seller: state.realEstateContractReducer.seller
        }
    },
    {
        getProperty
    }
)(HouseProfileView)