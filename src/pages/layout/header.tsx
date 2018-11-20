import * as React from 'react';
import $http from 'src/utils/axios/index';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Row, Col, message } from 'antd';
import './index.scss';

const { Header } = Layout;

class Cuslayout extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    handleLogout = () => {
        $http('logout').then(() => {
            message.success('退出成功');
            window.location.href = '/login';
        });
    }
    render() {
        return (
            <Header className='layout-header'>
                <Row>
                    <Col span={8}>
                        <Icon
                            className='icons'
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    </Col>
                    <Col span={8} offset={8} className='userinfo'>
                        <Icon type='user' className='icons' />
                        <Icon type='poweroff' className='icons' onClick={this.handleLogout} />
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default withRouter<any>(Cuslayout);
