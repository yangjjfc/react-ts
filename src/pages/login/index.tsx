import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import './index.scss';
const FormItem = Form.Item;
class Auth extends React.Component {
  props: any;
  constructor(props: any) {
    super(props);
    console.log('login');
  }
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form onSubmit={this.handleSubmit} className='login-form'>

          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Username'
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder='Password'
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className='login-form-forgot' href=''>
              Forgot password
          </a>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
          </Button>
            Or <a href=''>register now!</a>
          </FormItem>
        </Form>
      </>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Auth);

const mapStateToProps = (state: any) => {
  return {
    token: state.currentUser.token,
    clientId: state.currentUser.clientId
  };
};

export default connect(mapStateToProps)(WrappedNormalLoginForm);
