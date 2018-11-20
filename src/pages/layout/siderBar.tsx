import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import * as actions from 'src/store/action/index';
import './index.scss';
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class SiderBar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    static defaultProps = {
        collapsed: false
    };
    state = {
        checked: this.props.match.url
    };

    //菜单点击
    handleMenu = ({ key }) => {
        const { history, dispatch } = this.props;
        history.push(key);
        dispatch(actions.setPathName({ name: key }));
    }
    //渲染菜单
    renderMenu = (menu): any => {
        let defaultOpenKeys: string[] = []; //默认展开SubMenu
        const $menu = menu.map((item, index) => {
            if (item.children && item.children.length) {
                const { keys, menus } = this.renderMenu(item.children);
                defaultOpenKeys = keys.length ? keys : defaultOpenKeys;
                return (<SubMenu key={item.no} title={<span><Icon type='appstore' /><span>{item.label}</span></span>}>
                    {menus}
                </SubMenu>);
            } else {
                if (item.funcUrl === this.props.match.url) { //获取默认展开,三级菜单TODO
                    defaultOpenKeys = [item.parentNo];
                }
                return (<Menu.Item key={item.funcUrl}>
                    <Icon type='user' />
                    <span>{item.label}</span>
                </Menu.Item>);
            }
        });
        return {
            keys: defaultOpenKeys,
            menus: $menu
        };
    }
    render() {
        const { menu } = this.props.permission;
        const { keys, menus } = this.renderMenu(menu);
        return (
            <Sider
                trigger={null}
                collapsible={true}
                collapsed={this.props.collapsed}
                className='layout-sider'
            >
                <div className='logo'>yosemite</div>
                <Menu theme='dark' mode='inline'
                    defaultSelectedKeys={[this.state.checked]}
                    defaultOpenKeys={keys}
                    onSelect={this.handleMenu}>
                    {menus}
                </Menu>
            </Sider>
        );
    }
}

export default withRouter<any>(SiderBar);
