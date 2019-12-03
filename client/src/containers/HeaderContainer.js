import { connect } from 'react-redux';
import Header from '../components/Header';

export default connect(
    (state) => {
        return {
            node: state.realEstateContractReducer.node,
            accounts: state.realEstateContractReducer.accounts,
            seller: state.realEstateContractReducer.seller,
        }
    }
)(Header)