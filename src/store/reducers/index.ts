import { combineReducers } from 'redux';
import * as ActionType from '../action-types';

const currentUser = (state = {}, action) => {
    switch (action.type) {
        case ActionType.USER_INFO:
            return { ...action.msg };
            break;
        default:
            return state;
            break;
    }
};

const defaultState = {
    menu: [],
    button: []
};
const permission = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.USER_MENU:
        case ActionType.USER_BUTTON_PERMISSION:
            return { ...state, ...{ [action.datatype]: action.msg } };
            break;
        default:
            return state;
            break;
    }
};
const routers = (state = {}, action) => {
    switch (action.type) {
        case ActionType.USER_PATHNAME:
            return { ...state, ...action.msg };
            break;
        default:
            return state;
            break;
    }
};
const rootReducer = combineReducers({
    currentUser,
    permission,
    routers
});

export default rootReducer;