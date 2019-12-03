import { connect } from 'react-redux';
import NewPropertyModal from '../components/NewPropertyModal';

export default connect(
    (state) => {
        return {
            web3: state.realEstateContractReducer.web3,
            contract: state.realEstateContractReducer.contract,
            accounts: state.realEstateContractReducer.accounts,
        }
    }
)(NewPropertyModal)