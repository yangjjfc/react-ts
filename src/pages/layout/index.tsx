import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import asyncComponents from 'src/utils/custom/asyncComponents.js';
import SiderBar from './siderBar';
import Header from './header';
// import { bindActionCreators } from 'redux';

import './index.scss';
const { Content } = Layout;

// export interface IHomePageProps extends RouteComponentProps<any> {
//   home: string; 
// }
class Cuslayout extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    collapsed: false,
  };
  //展开
  toggleExpansion = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  //获取href
  getLocationHref = () => {
    const $url = this.props.match.url.replace('\/', '');
    return asyncComponents($url);
  }
  render() {
    console.log('layout');
    const MyComponents: any = this.getLocationHref();
    return (
      <Layout className='layout-container'>
        <SiderBar {...this.props} collapsed={this.state.collapsed} />
        <Layout className={this.state.collapsed ? 'layout-container-right retraction' : 'layout-container-right'}>
          <Header toggle={this.toggleExpansion} collapsed={this.state.collapsed} />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {MyComponents ? <MyComponents /> : null}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    permission: state.permission
  };
};

export default withRouter<any>(connect(mapStateToProps)(Cuslayout));
