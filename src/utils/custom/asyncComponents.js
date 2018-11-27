import * as React from 'react';
import Loadable from 'react-loadable'; //懒加载
const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>未找到该页面</div>;
    }
    else {
        return null;
    }
};

export default path => Loadable({ loader: () => import(`@/pages/${path}`), loading: MyLoadingComponent });
