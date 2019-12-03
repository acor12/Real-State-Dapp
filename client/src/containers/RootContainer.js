import { connect } from 'react-redux';
import { setContract, getPropertiesCount, newPropertiesCount, soldPropertiesCount, changeAccount } from '../redux/realEstateContractActions';
import Root from '../components/Root';

export default connect(
    state => {
        return {
            foo: state.realEstateContractReducer
        }
    },
    {
        setContract,
        changeAccount,
        newPropertiesCount,
        getPropertiesCount,
        soldPropertiesCount
    }
)(Root)