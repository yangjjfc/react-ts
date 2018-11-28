import * as React from 'react';
import $http from 'src/utils/axios/index';
import { Button, Table, message, Modal } from 'antd';
const { Column, ColumnGroup } = Table;

const URL = {
    detail: 'brp.enterpriseApplication.getEnterpriseApplicationDetail',  // 通过企业编号查询企业应用详情
    notOpen: 'brp.releaseAuth.getNotOpenReleaseByEnterpriseNo', // 待开通应用列表
    update: 'brp.releaseAuth.update',
    addNew: 'brp.releaseAuth.save'  // 开通新应用
};
class AddApplication extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        confirmLoading: false,
        form: {
            enterpriseName: '',
            enterpriseNo: '',
            loginAccount: '',
        },
        list: [],
    };
    /* componentWillReceiveProps(nextProps) {
        
    } */
    componentWillMount() {
        this.getDetail();
    }
    // 获取企业应用详情
    getDetail = (props = this.props) => {
        console.log(this.props);
        $http(URL.detail, {
            enterpriseNo: props.enterpriseNo
        }).then(res => {
            this.setState({
                form: res.data,
                list: res.data.releaseAuthorizationVos.map(item => {
                    item.statusX = (item.status === 'enabled' ? '有效' : '失效');
                    return item;
                })
            });
        });
    }
    // 注销、开通
    changeStatus(row) {
        //console.log(row);
        $http(URL.update, {
            params: {
                enterpriseNo: this.props.enterpriseNo,
                releaseId: row.releaseId,
                releaseUrl: row.releaseUrl,
                status: row.status === 'enabled' ? 'disabled' : 'enabled'
            }
        }).then(res => {
            message.success('更新成功');
            this.getDetail();
            this.props.update();
        });
    }
    handleCancel = () => {
        this.props.update('close');
    }
    render() {
        const form = this.state.form;
        return (
            <Modal title='企业开通应用'
                visible={this.props.visible}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                footer={[
                    <Button key='back' onClick={this.handleCancel}>
                        关闭
                    </Button>,
                ]}
            >
                <ul>
                    <li>企业名称：{form.enterpriseName}</li>
                    <li>企业编号{form.enterpriseNo}</li>
                    <li>主账号{form.loginAccount}</li>
                </ul>
                <div style={{ marginBottom: '10px' }}>
                    <Button
                        type='primary'
                        htmlType='submit'
                    >开通其它应用</Button>
                </div>

                <Table dataSource={this.state.list} rowKey='releaseId' size='small' pagination={false}>
                    <Column
                        title='应用名称'
                        dataIndex='releaseName'
                    />
                    <Column
                        title='版本号'
                        dataIndex='releaseId'
                    />
                    <Column
                        title='是否有效'
                        dataIndex='statusX'
                    />
                    <Column
                        title='操作'
                        key='action'
                        render={(text) => (
                            <div>
                                <a href='javascript:void(0)' onClick={this.changeStatus.bind(this, text)}>
                                    {text.status === 'enabled' ? '注销' : '开通'}</a>
                            </div>
                        )}
                    />
                </Table>
            </Modal>);
    }
}

export default AddApplication;