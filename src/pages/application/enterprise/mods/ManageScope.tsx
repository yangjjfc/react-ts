import * as React from 'react';
import { Modal, message, Tree, Row, Col } from 'antd';
import $http from 'src/utils/axios/index';
import Item from 'antd/lib/list/Item';
const TreeNode = Tree.TreeNode;
const URL = {
    tree: 'brp.enterprise.findEnterpriseBusinessScorp',
    modify: 'brp.enterprise.saveEnterpriseBusinessScorp'
};
class ManageScope extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        autoExpandParent: true,
        textareaVal: '',
        checkedKeys: [],
        selectedKeys: [],
        treeData: [],
        expandedKeys: [],
    };
    componentWillMount() {
        this.getTree();
    }

    handleCancel = () => {
        this.props.update('close');
    }
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        let textareaVal = '';
        const handleExecTree = (list, checkeds) => {
            list.forEach(item => {
                checkeds.includes(item.id + '') && (textareaVal += item.textName);
                if (item.children && item.children.length) {
                    handleExecTree(item.children, checkeds);
                }
            });

        };
        this.setState({ checkedKeys });
        handleExecTree(this.state.treeData, checkedKeys);
        textareaVal = textareaVal.substr(0, textareaVal.length - 1);
        this.setState({
            textareaVal
        });

    }

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        //this.setState({ selectedKeys });
    }
    submit = () => {
        $http(URL.modify, {
            params: {
                enterpriseNo: this.props.enterpriseNo,
                businessScorp: this.state.checkedKeys
            }
        }).then(res => {
            message.success('保存成功');
            this.props.update('close');
        });
    }
    //获取树
    getTree() {
        $http(URL.tree, {
            enterpriseNo: this.props.enterpriseNo
        }).then(res => {
            const data = res.data;
            this.setState({
                treeData: data.jyfw,
                checkedKeys: data.jyfwIds.map(item => item + ''),
                textareaVal: data.jyfwText,
            });
        });
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            item.isLeaf = Boolean(item.isLeaf);
            item.key = item.id + '';
            item.title = item.name;
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }

    render() {
        return (<Modal title='企业经营范围'
            okText='确定'
            cancelText='取消'

            visible={this.props.visible}
            onOk={this.submit}
            onCancel={this.handleCancel}
            width={800}
        >
            <Row>
                <Col span={12}>
                    {this.state.textareaVal}
                </Col>
                <Col span={12}>
                    <Tree
                        checkable={true}
                        autoExpandParent={this.state.autoExpandParent}
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                    >
                        {this.state.treeData.length ? this.renderTreeNodes(this.state.treeData) : null}
                    </Tree>
                </Col>
            </Row>

        </Modal>);
    }
}
export default ManageScope;