import * as React from 'react';
import { Tabs } from 'antd';
import Nonactivated from './mods/Nonactivated';
import AlreadyOpened from './mods/AlreadyOpened';
const TabPane = Tabs.TabPane;
class RegistrationForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {

        return (<div>
            <Tabs defaultActiveKey='2' >
                <TabPane tab='未入驻企业' key='1'>
                    <Nonactivated />
                </TabPane>
                <TabPane tab='已入驻企业' key='2'>
                    <AlreadyOpened />
                </TabPane>
            </Tabs>
        </div>);
    }
}
export default RegistrationForm;