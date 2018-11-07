import { combineReducers } from 'redux'
import { USERINFO } from '../action'

//当前用户信息,主要用来获取token,clientId
function currentUser(state = {}, action) {
    switch (action.type) {
        case USERINFO:
            return {...action.msg};
            break;
        default:
            return state;
            break;
    }
}



const rootReducer = combineReducers({
  currentUser, //currentUser(state.currentUser, action)
})

export default rootReducer