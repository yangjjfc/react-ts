import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'src/store/action/index';
import * as Loadable from 'react-loadable'; //懒加载1
import login from '../login';
const { getPermission } = actions;
const LoadableComponent = Loadable({
  loader: () => import('../dashboard'),
  loading: (() => null),
});

class Beforerouter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    name: '',
  };
  getComponentName = () => {
    const pathname = this.props.history.location.pathname;
    let name: any = '';
    if (pathname === '/' || pathname === '/login') {
      name = login;
    } else {
      if (!this.props.permission.menu.length) {
        this.props.dispatch(getPermission()).then(() => {
          name = LoadableComponent;
        });
      } else {
        name = LoadableComponent;
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
  console.log(state.routers);
  return {
    routerState: state.routers,
    permission: state.permission
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getPermission: bindActionCreators(actions.getPermission, dispatch)
//   };
// };

export default connect(mapStateToProps)(Beforerouter);
