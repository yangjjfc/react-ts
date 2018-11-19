import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'src/store/action/index';
import login from '../login';
import form from '../form';
import table from '../table';
import './index.scss';

const { Header, Sider, Content } = Layout;
const sss = {
  login,
  form,
  table
};
// export interface IHomePageProps extends RouteComponentProps<any> {
//   home: string;
// }
class SiderDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

  }
  state = {
    collapsed: false,
    name: '',
    checked: this.props.match.url
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  getLocationHref = (names?: any) => {
    names = names ? names : this.props.match.url.split('/').reverse()[0];
    return sss[names];
  }
  handleMenu = ({ item, key, keyPath }) => {
    const { history, dispatch } = this.props;
    history.push(key);
    const str = key.split('/').reverse()[0];
    dispatch(actions.setPathName({ name: '/app/' + str }));
    this.props.history.push('/app/' + str);
  }
  render() {
    const Auths: any = this.getLocationHref();
    return (
      <Layout className='layout-container'>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
          className='layout-sider'
        >
          <div className='logo'>yosemite</div>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={[this.state.checked]} onSelect={this.handleMenu}>
            <Menu.Item key='/app/login' >
              <Icon type='user' />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key='/app/form' >
              <Icon type='video-camera' />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key='/app/table' >
              <Icon type='upload' />
              <span>nav x 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={this.state.collapsed ? 'layout-container-right retraction' : 'layout-container-right'}>
          <Header className='layout-header'>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {Auths ? <Auths /> : null}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.currentUser.token,
    clientId: state.currentUser.clientId
  };
};

export default withRouter<any>(connect(mapStateToProps)(SiderDemo));
