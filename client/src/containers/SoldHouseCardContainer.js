import { connect } from 'react-redux';
import { getProperty } from '../redux/realEstateContractActions';
import SoldHouseCard from '../components/SoldHouseCard';

export default connect(
    (state) => {
        return {
            contract: state.realEstateContractReducer.contract,
            accounts: state.realEstateContractReducer.accounts,
            node: state.realEstateContractReducer.node
        }
    },
    {
        getProperty
    }
)(SoldHouseCard)