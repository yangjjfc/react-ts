import * as React from 'react';
import $http from 'src/utils/axios/index';
import { Form, Table, message, Modal, Row, Col, Select, Input } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
const URL = {
    add: 'brp.release.save',
    update: 'brp.release.update',
    allTree: 'brp.releaseFun.releaseFuncTreeCheckView',
    includeTree: 'brp.releaseFun.authTreeView'
};
class VersionAdd extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        selectedRowKeys: [],
        list: []
    };
    componentWillMount() {
        const formData = this.props.formData || {};
        if (formData.id) {
            this.getAuthList({
                appCode: formData.appCode,
                releaseId: formData.id
            });
        }
    }
    submit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.funcNos = this.state.selectedRowKeys;
                if (this.props.type === 'add') {
                    $http(URL.add, { params: values }).then((result) => {
                        message.success('新增成功');
                        this.props.update();
                    });
                } else {
                    const params = Object.assign(values, this.props.formData);
                    $http(URL.update, { params }).then((result) => {
                        message.success('编辑成功');
                        this.props.update();
                    });
                }
            }
        });
    }
    traverseCheckds = (list, isAllNodes, result) => {
        list.forEach(item => {
            if (isAllNodes) {
                result.push(item.no);
            } else {
                item.checked && result.push(item.no);
            }
            item.children && this.traverseCheckds(item.children, isAllNodes, result);
        });
        return result;
    }
    handleChange = (val) => {
        const formData = this.props.appList.filter(item => item.code === val)[0];
        const params = formData ? { appCode: formData.code, releaseId: this.props.formData.id } : null;
        this.getAuthList(params);
    }
    //获取权限列表
    getAuthList = (param) => {
        const url = this.props.optType === 'setAuth' ? URL.includeTree : URL.allTree;
        $http(url, {
            params: param
        }).then((result) => {
            const data = result.data;
            const selectedRowKeys = this.traverseCheckds(data, false, []);
            this.setState({
                list: data,
                selectedRowKeys
            });

        });
    }
    handleCancel = () => {
        this.props.update('close');
    }
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const options = this.props.appList ? this.props.appList.map(item => <Option value={item.code} key={item.id}>{item.name}</Option>) : [];
        const formData = this.props.formData || {};
        //console.log(this.props.formData);

        const columns = [{
            title: '菜单名称',
            dataIndex: 'label',
            key: 'label'
        }, {
            title: '菜单编码',
            dataIndex: 'funcCode',
            key: 'funcCode'
        }, {
            title: '菜单路径',
            dataIndex: 'funcUrl',
            key: 'funcUrl'
        }, {
            title: '权限集合',
            dataIndex: 'permissionCodes',
            key: 'permissionCodes'
        }];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (<Modal title='开通应用'
            okText='确定'
            cancelText='取消'
            visible={this.props.visible}
            onOk={this.submit}
            onCancel={this.handleCancel}
            width={800}
        >
            <Form layout='inline'>
                <FormItem label='选择应用'>
                    {getFieldDecorator('appCode', {
                        initialValue: formData.appCode,
                        rules: [{
                            required: true, message: '请选择',
                        }],
                    })(
                        <Select onChange={this.handleChange} style={{ width: '150px' }}>
                            {options}
                        </Select>
                    )}
                </FormItem>
                <FormItem label='版本名称'>
                    {getFieldDecorator('releaseName', {
                        initialValue: formData.releaseName,
                        rules: [{
                            required: true, message: '请输入',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='URL地址'>
                    {getFieldDecorator('releaseUrl', {
                        initialValue: formData.releaseUrl,
                        rules: [{
                            required: true, message: '请输入',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='版本号'>
                    {getFieldDecorator('releaseVersion', {
                        initialValue: formData.releaseVersion,
                        rules: [{
                            required: true, message: '请输入',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.list} rowKey='no' />
        </Modal>);
    }
}
const VersionRegistrationForm = Form.create()(VersionAdd);
export default VersionRegistrationForm;