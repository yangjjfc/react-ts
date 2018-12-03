import * as React from 'react';
import $http from 'src/utils/axios/index';
import VersionAdd from './mods/VersionAdd';
import { Form, Table, Button, Input, Row, Col } from 'antd';
const FormItem = Form.Item;
const Column = Table.Column;
const URL = {
    list: 'brp.release.findListPage',
    add: 'brp.release.save',
    update: 'brp.release.update',
    remove: 'brp.release.remove',
    save: 'brp.releaseFun.save',
    get: '	brp.releaseFun.get',
    appList: 'brp.application.findList'
};
class VersionComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        currentEnterpriseNo: '',
        page: {
            pageSize: 20,
            current: 1,
            total: 0
        },
        list: [],
        optType: '', //操作类型
        isOprate: false,
        formData: null,
        appList: []
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
    // 获取应用列表
    getAppList = () => {
        if (this.state.appList.length) {
            return new Promise((resolve) => {
                resolve(this.state.appList);
            });
        } else {
            return $http(URL.appList, {
                params: {}
            }).then(result => {
                this.setState({
                    appList: result.data
                });
            });
        }
    }
    add = (optType, formData) => {
        this.getAppList().then(() => {
            this.setState({
                formData,
                optType,
                isOprate: true
            });
        });
    }
    //更新组件状态
    updateApp = (type) => {
        if (type === 'close') {
            this.setState({
                isOprate: false
            });

        } else if (type === 'update') {
            this.getList();
        } else {
            this.setState({
                isOprate: false
            });
            this.getList();
        }
    }
    edit() {
        console.log('3');
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const pagination = {
            ...this.state.page,
            onChange: this.getList
        };
        const Add = this.state.isOprate ? <VersionAdd visible={this.state.isOprate} appList={this.state.appList}
            update={this.updateApp}
            type={this.state.optType} formData={this.state.formData} /> : null;
        return (<div>
            {Add}
            <Row>
                <Col span={4}>
                    <Button type='primary' onClick={this.add.bind(this, 'add', {})}>发布</Button>
                </Col>
                <Col span={20} style={{ textAlign: 'right' }}>
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
                </Col>
            </Row>

            <Table dataSource={this.state.list} rowKey='index' pagination={pagination} size='small'>
                <Column
                    title='序号'
                    dataIndex='index'
                />
                <Column
                    title='应用编码'
                    dataIndex='appCode'
                />
                <Column
                    title='版本名称'
                    dataIndex='releaseName'
                />
                <Column
                    title='URL地址'
                    dataIndex='releaseUrl'
                />
                <Column
                    title='版本号'
                    dataIndex='releaseVersion'
                />
                <Column
                    title='创建人'
                    dataIndex='operName'
                />
                <Column
                    title='操作'
                    key='action'
                    render={(text, record) => (
                        <div>
                            <a href='javascript:void(0)' onClick={this.add.bind(this, 'update', record)} style={{ paddingRight: '10px' }}>编辑</a>
                            <a href='javascript:void(0)' onClick={this.edit.bind(this, text)} style={{ paddingRight: '10px' }}>权限设置</a>
                            <a href='javascript:void(0)' onClick={this.edit.bind(this, text)}>删除</a>
                        </div>
                    )}
                />
            </Table>
        </div>);
    }
}
const VersionRegistrationForm = Form.create()(VersionComponent);
export default VersionRegistrationForm;