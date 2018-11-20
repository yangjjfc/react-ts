import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from 'src/store/action/index';
import asyncComponents from 'src/utils/custom/asyncComponents.js';
const Login = asyncComponents('login');
const Layout = asyncComponents('layout');
class Beforerouter extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
  }
  url = '';
  getComponentName = () => {
    const { permission, dispatch, match } = this.props;
    const pathname = this.url = match.url;
    let name: any = '';
    if (pathname === '/' || pathname === '/login') {
      name = Login;
    } else {
      if (!permission.menu.length) {
        dispatch(actions.getUser()).then(res => {
          if (!res.enterpriseNo) {
            window.location.href = '/login';
            return;
          } else {
            dispatch(actions.getPermission()).then(() => {
              name = Layout;
            });
          }
        });
      } else {
        name = Layout;
      }
    }
    return name;
  }
  render() {
    const Mycomponent = this.getComponentName();
    return (
      <div>
        {Mycomponent ? <Mycomponent /> : null}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    routerState: state.routers,
    permission: state.permission
  };
};

export default connect(mapStateToProps)(Beforerouter);
