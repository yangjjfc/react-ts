import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'src/store/action/index';
import logins from '../login';
import forms from '../form';
import tables from '../table';
import './index.scss';
const sss = {
  logins,
  forms,
  tables
};
const { Header, Sider, Content } = Layout;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: (text: any) => <a href='javascript:;'>{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 21 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
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
    checked: this.props.match.path
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  getLocationHref = (names?: any) => {
    console.log(this.props.match);
    names = names ? names : this.props.match.path.split('/').reverse()[0] + 's';
    console.log(names);
    this.setState({
      name: sss[names]
    });
  }
  handleMenu = ({ item, key, keyPath }) => {
    const { history } = this.props;
    history.push(key);
    const str = key.split('/').reverse()[0] + 's';
    // str = str.substring(0, 1).toUpperCase() + str.substring(1);
    this.getLocationHref(str);
  }
  componentWillMount() {
    const { getPermission } = this.props;
    getPermission();
  }
  componentDidMount() {
    const Auths = this.state.name;

    if (!Auths) {
      this.getLocationHref();
    }
  }
  render() {
    const Auths = this.state.name;
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
              <span>nav 3</span>
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
  console.log(state);
  return {
    token: state.currentUser.token,
    clientId: state.currentUser.clientId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPermission: bindActionCreators(actions.getPermission, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderDemo);
