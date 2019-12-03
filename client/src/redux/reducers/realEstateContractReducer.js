import { actions } from '../realEstateContractActions';

const initialState = {
    web3: null,
    accounts: null,
    contract: null,
    seller: null,
    count: null,
    soldProperties: null,
    node: null
}

function web3Reducer(state = initialState, action = null) {
    switch (action.type) {
        case actions.SET_CONTRACT:
            return {
                web3: action.payload.web3,
                accounts: action.payload.accounts,
                contract: action.payload.contract,
                seller: action.payload.seller,
                node: action.payload.node

            }
        case actions.GET_COUNT:
            return {
                ...state,
                count: action.payload.properties,
                soldProperties: action.payload.soldProperties
            }
        case actions.GET_PROPERTY + '_SUCCESS':
            return state
        case actions.GET_BALANCE + '_SUCCESS':
            return state
        case actions.GET_PROPERTIES:
            return {
                ...state,
                count: action.payload
            }
        case actions.GET_SOLD_PROPERTIES:
            return {
                ...state,
                soldProperties: action.payload
            }
        case actions.CHANGE_ACCOUNT:
            return {
                ...state,
                accounts: action.payload
            }
        default:
            return state;
    }
}

export default web3Reducer;