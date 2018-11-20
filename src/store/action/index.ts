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
    return async (dispatch, getState) => {
        const { currentUser } = getState();
        if (!currentUser.enterpriseNo) {
            const res = await $http('currentUser', {});
            dispatch(setUser(res.data));
            return res.data;
        } else {
            return currentUser;
        }

    };
};

const filterMenu = (meun) => {
    return meun.filter(item => {
        if (item.children && item.children.length) {
            item.children = filterMenu(item.children);
        }
        return item.funcType === 'MENU';
    });
};
//获取权限
export const getPermission = () => {
    return async (dispatch, getState) => {
        const { permission } = getState();
        if (permission.menu.length) {
            return permission;
        } else {
            const res = await $http('brp.user.getCurrentUserMenuRights');
            if (res.data) {
                dispatch(setMenu(filterMenu(res.data.menuTree)));
                dispatch(setButton(res.data.permissionList));
                return res.data;
            }
        }
    };
};

// export const currentUser= ()=>{
//     return new Promise((resolve, reject) => {
//         state.userInfo && state.userInfo.enterpriseNo ? resolve(state.userInfo) // 判断是否需要去请求
//             : Http('currentUser', {
//                 token: state.userInfo ? state.userInfo.token : ''
//             }).then(result => {
//                 // 获取token 获取登录信息
//                 let user = result.data || {};
//                 commit('CHANGEUSER', user);
//                 resolve(user);
//             }, err => {
//                 reject(err);
//             });
//     });
// },