import * as React from 'react';
import $http from 'src/utils/axios/index';
import { Tabs, Input, Button, Form, Table, message, Popconfirm } from 'antd';
const { Column, ColumnGroup } = Table;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const URL = {
    list: 'brp.enterpriseApplication.getToBeOpenBrpEnterprise',
    settled: 'brp.enterpriseApplication.saveOutEnterpriseIn'   // 入驻
};
class RegistrationForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        //this.IsButton = this.IsButton.bind(this);
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
    private callback = (evt): void => {
        console.log(evt);
    }
    settled(row, record) {
        /* this.$confirm('是否确认当前企业入驻？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            
        }).catch(() => {
        }); */
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
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const pagination = {
            ...this.state.page,
            onChange: this.getList
        };
        return (<div>
            <Tabs defaultActiveKey='1' onChange={this.callback}>
                <TabPane tab='未入驻企业' key='1'>
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
                </TabPane>
                <TabPane tab='已入驻企业' key='2'>Content of Tab Pane 2</TabPane>
            </Tabs>
        </div>);
    }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;