import $http from 'src/utils/axios/index';
import * as ActionType from '../action-types';
//存储当前用户信息 action 
export const setUser = msg => {
    return {
        msg,
        type: ActionType.USER_INFO
    };
};
export const setMenu = msg => {
    return {
        msg,
        datatype: 'menu',
        type: ActionType.USER_MENU
    };
};
export const setButton = msg => {
    return {
        msg,
        datatype: 'button',
        type: ActionType.USER_BUTTON_PERMISSION
    };
};
export const setPathName = msg => {
    return {
        msg,
        type: ActionType.USER_PATHNAME
    };
};

/**
 * action函数
 */
export const getUser = () => {
    return (dispatch, getState) => {
        console.log(getState());
        $http('currentUser', {}).then(res => {
            dispatch(setUser(res.data));
        });
    };
};

//获取权限
export const getPermission = () => {
    return async (dispatch) => {
        await $http('brp.user.getCurrentUserMenuRights').then(res => {
            if (res.data) {
                dispatch(setMenu(res.data.menuTree));
                dispatch(setButton(res.data.permissionList));
            }
        });
    };
};