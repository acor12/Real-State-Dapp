import { connect } from 'react-redux';
import { newPropertiesCount } from '../redux/realEstateContractActions';
import RealEstateView from '../components/RealEstateView';

export default connect(
    (state) => {
        return {
            web3: state.realEstateContractReducer.web3,
            contract: state.realEstateContractReducer.contract,
            accounts: state.realEstateContractReducer.accounts,
            seller: state.realEstateContractReducer.seller,
            count: state.realEstateContractReducer.count,
            soldProperties: state.realEstateContractReducer.soldProperties
        }
    },
    {
        newPropertiesCount
    }
)(RealEstateView)