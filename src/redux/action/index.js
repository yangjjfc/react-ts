import $ from '@/utils/axios/index'

export const USERINFO = 'USERINFO' //用户信息

//存储当前用户信息
export const setCurrentUser = msg => {
    return {
        msg,
        type: USERINFO
    }
}

//获取初始的token和clientId
export const getUser = () => {
    return dispatch => {
        $.post('currentUser', {}).then(result => {
            dispatch(setCurrentUser(result.data));
        })
    }
}

//异步action暂时无法解决
export const login = (data = {}) => {
    return dispatch => {
        return $.post('login', data).then(result => {
            if (result.code === 'SUCCESS') {
                dispatch(setCurrentUser(result.data));
            }
        })
    }
}