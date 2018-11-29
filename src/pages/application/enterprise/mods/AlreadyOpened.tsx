import * as React from 'react';
import $http from 'src/utils/axios/index';
import AddApplication from './AddApplication';
import ManageScope from './ManageScope';
import { Input, Button, Form, Table, message, Popconfirm, Row } from 'antd';
const { Column, ColumnGroup } = Table;
const FormItem = Form.Item;
const URL = {
    list: 'brp.enterpriseApplication.findOpenedApplication'
};
class AlreayOpened extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        isOpen: false,
        isManage: false,
        currentEnterpriseNo: '',
        page: {
            pageSize: 20,
            current: 1,
            total: 0
        },
        list: [],
    };
    componentWillMount() {
        this.getList();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.getList();
    }
    getList = (current: number = 1) => {
        $http(URL.list, {
            ignoreRepeat: true,
            params: {
                keywords: this.props.form.getFieldValue('keywords')
            },
            pageParams: {
                pageIndex: current,
                pageSize: this.state.page.pageSize
            }
        }).then(result => {
            const data = result.data;
            this.setState({
                page: {
                    current: data.pageIndex,
                    pageSize: data.pageSize,
                    total: data.total
                }
            });
            this.setState({
                list: data.rows.map((item, index) => {
                    item.index = (this.state.page.current - 1) * this.state.page.pageSize + index + 1;
                    return item;
                })
            });
        });
    }
    edit(row) {
        this.setState({
            currentEnterpriseNo: row.enterpriseNo,
            isOpen: true
        });
    }
    scope(row) {
        this.setState({
            currentEnterpriseNo: row.enterpriseNo,
            isManage: true
        });
    }
    //更新组件状态
    updateApp = (type) => {
        if (type === 'close') {
            this.setState({
                isOpen: false
            });
        } else {
            this.getList();
        }
    }
    updateManage = (type) => {
        if (type === 'close') {
            this.setState({
                isManage: false
            });
        } else {
            this.getList();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const pagination = {
            ...this.state.page,
            onChange: this.getList
        };
        const App = this.state.isOpen ? <AddApplication visible={this.state.isOpen} enterpriseNo={this.state.currentEnterpriseNo}
            update={this.updateApp} /> : null;
        const Manage = this.state.isManage ? <ManageScope visible={this.state.isManage} enterpriseNo={this.state.currentEnterpriseNo}
            update={this.updateManage} /> : null;
        return (
            <div>
                {App}
                {Manage}
                <Form layout='inline' onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('keywords', {
                            initialValue: ''
                        })(
                            <Input placeholder='Username' />
                        )}

                    </FormItem>
                    <FormItem>
                        <Button
                            type='primary'
                            htmlType='submit'
                        >搜索</Button>
                    </FormItem>
                </Form>
                <Table dataSource={this.state.list} rowKey='index' pagination={pagination} size='small'>
                    <Column
                        title='序号'
                        dataIndex='index'
                    />
                    <Column
                        title='企业编号'
                        dataIndex='enterpriseNo'
                    />
                    <Column
                        title='企业名称'
                        dataIndex='enterpriseName'
                    />
                    <Column
                        title='主账号'
                        dataIndex='loginAccount'
                    />
                    <Column
                        title='手机号码'
                        dataIndex='mobilePhone'
                    />
                    <Column
                        title='已开通应用'
                        dataIndex='openingApps'
                    />
                    <Column
                        title='操作'
                        key='action'
                        render={(text, record) => (
                            <div>
                                <a href='javascript:void(0)' onClick={this.edit.bind(this, record)} style={{ paddingRight: '10px' }}>开通应用</a>
                                <a href='javascript:void(0)' onClick={this.scope.bind(this, text)}>经营范围</a>
                            </div>
                        )}
                    />
                </Table>
            </div>);
    }
}
const WrappedRegistrationForm = Form.create()(AlreayOpened);
export default WrappedRegistrationForm;