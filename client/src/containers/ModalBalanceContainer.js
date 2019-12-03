import { connect } from 'react-redux';
import ModalBalance from '../components/ModalBalance';
import { getBalance } from "../redux/realEstateContractActions";

export default connect(
    (state) => {
        return {
            contract: state.realEstateContractReducer.contract,
            accounts: state.realEstateContractReducer.accounts,
        }
    },
    {
        getBalance
    }
)(ModalBalance)