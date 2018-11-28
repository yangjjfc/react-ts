import * as React from 'react';
import $http from 'src/utils/axios/index';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Row, Col, message, Modal } from 'antd';
import './index.scss';

const { Header } = Layout;

class Cuslayout extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        isConfirm: false
    };
    handleLogout = () => {
        $http('logout').then(() => {
            message.success('退出成功');
            window.location.href = '/login';
        });
    }
    toggleModal(isShow) {
        this.setState({
            isConfirm: isShow
        });
    }

    render() {
        return (

            <Header className='layout-header'>
                <Modal
                    title='提示'
                    visible={this.state.isConfirm}
                    onOk={this.handleLogout}
                    onCancel={this.toggleModal.bind(this, false)}
                    okText='确认'
                    cancelText='取消'
                >
                    <p>确定退出该系统吗？</p>
                </Modal>
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
                        <Icon type='poweroff' className='icons' onClick={this.toggleModal.bind(this, true)} />
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default withRouter<any>(Cuslayout);
