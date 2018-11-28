import * as React from 'react';
import $http from 'src/utils/axios/index';
import { Input, Button, Form, Table, message, Popconfirm } from 'antd';
const { Column, ColumnGroup } = Table;
const FormItem = Form.Item;
const URL = {
    list: 'brp.enterpriseApplication.getToBeOpenBrpEnterprise',
    settled: 'brp.enterpriseApplication.saveOutEnterpriseIn'   // 入驻
};
class Nonactivated extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
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
    settled(row, record) {
        $http(URL.settled, {
            params: {
                enterpriseName: row.enterpriseName,
                enterpriseNo: row.enterpriseNo
            }
        }).then(res => {
            message.success('企业入驻成功!');
            this.getList(1);
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const pagination = {
            ...this.state.page,
            onChange: this.getList
        };
        return (
            <div><Form layout='inline' onSubmit={this.handleSubmit}>
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
                        title='操作'
                        key='action'
                        render={(text, record) => (
                            <Popconfirm title='是否确认当前企业入驻？'
                                onConfirm={this.settled.bind(this, text, record)} okText='确定' cancelText='取消'>
                                <a href='#'>入驻</a>
                            </Popconfirm>
                        )}
                    />
                </Table>
            </div>);
    }
}
const WrappedRegistrationForm = Form.create()(Nonactivated);
export default WrappedRegistrationForm;