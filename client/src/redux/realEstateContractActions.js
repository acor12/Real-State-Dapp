export const actions = {
    SET_CONTRACT: 'SET_CONTRACT',
    GET_PROPERTY: 'GET_PROPERTY',
    GET_BALANCE: 'GET_BALANCE',
    GET_COUNT: 'GET_COUNT',
    GET_PROPERTIES: 'GET_PROPERTIES',
    GET_SOLD_PROPERTIES: 'GET_SOLD_PROPERTIES',
    CHANGE_ACCOUNT: 'CHANGE_ACCOUNT'
}

export function setContract(web3, accounts, contract, seller, node) {
    return {
        type: actions.SET_CONTRACT,
        payload: {
            web3,
            accounts,
            contract,
            seller,
            node
        }
    }
}
export function getPropertiesCount(properties, soldProperties) {
    return {
        type: actions.GET_COUNT,
        payload: {
            properties,
            soldProperties
        }
    }
}
export function getProperty(data) {
    return {
        type: actions.GET_PROPERTY,
        payload: data
    }
}
export function getBalance(balance) {
    return {
        type: actions.GET_BALANCE,
        payload: balance
    }
}
export function newPropertiesCount(properties) {
    return {
        type: actions.GET_PROPERTIES,
        payload: properties
    }
}
export function soldPropertiesCount(properties) {
    return {
        type: actions.GET_SOLD_PROPERTIES,
        payload: properties
    }
}
export function changeAccount(accounts) {
    return {
        type: actions.CHANGE_ACCOUNT,
        payload: accounts
    }
}