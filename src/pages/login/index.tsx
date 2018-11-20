import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import $http from 'src/utils/axios/index';
import encryption from 'src/utils/custom/encryption';

import * as actions from 'src/store/action/index';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Alert } from 'antd';
import './index.scss';

const { getUser, setUser, setPathName } = actions;
const FormItem = Form.Item;

// interface ILoginStatus {
//   form: {
//     password: string;
//     username: string;
//     authCode: string;
//   };
//   loading: boolean;
//   imgSrc: string;
// }

class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: {
        username: 'yosemite',
        password: '123456',
        authCode: '1234'
      },
      error: {
        show: false,
        msg: ''
      },
      loading: false,
      imgSrc: 'http://scmp.dev.cloudyigou.com/gateway/verifyCode/'
    };
  }
  /**
   * 登录
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        const { dispatch, token, clientId } = this.props;
        $http('login', { ...values, password: encryption(values.password, clientId, token) }).then(res => {
          if (res.code === 'SUCCESS') {
            dispatch(setUser(res.data));
            dispatch(setPathName({ name: '/application/enterprise/index' }));
            setTimeout(() => {
              this.props.history.push('/application/enterprise/index'); //this.props.history获取路由信息
            }, 200);
          } else {
            this.bindErrEvent(res);
          }
        }).catch((error) => {
          this.bindErrEvent(error);
        }).finally(() => {
          this.setState({
            loading: false,
          });
        });
      }
    });
  }
  //切换验证码图片
  changeAuthImg = () => {
    this.setState({
      imgSrc: this.state.imgSrc + '?t=' + Math.round(Math.random() * 1000000)
    });
  }
  //处理错误事件
  bindErrEvent = (err) => {
    this.props.form.setFieldsValue({
      password: '',
      authCode: ''
    });
    this.setState({
      error: {
        show: true,
        msg: err.message
      }
    });
    this.changeAuthImg();
  }
  componentWillMount() {
    this.changeAuthImg();
    console.log(222);
    const { dispatch } = this.props;
    dispatch(getUser());
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { username, password, authCode } = this.state.form;
    return (
      <div className='auth_box'>
        <div className='auth_title'>demo</div>
        <div className='auth_form'>
          {this.state.error.show ? <Alert message={this.state.error.msg} className='errorMsg' type='error' showIcon={true} /> : null}
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <FormItem>
              {getFieldDecorator('userName', {
                initialValue: username,
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                initialValue: password,
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' />
              )}
            </FormItem>
            <FormItem>
              <Row>
                <Col span={12}>
                  {getFieldDecorator('authCode', {
                    initialValue: authCode,
                    rules: [{ required: true, message: '请输入验证码!' }],
                  })(
                    <Input prefix={<Icon type='safety' style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={4} placeholder='验证码' />
                  )}
                </Col>
                <Col span={12}>
                  <img src={this.state.imgSrc} className='imageCode' alt='验证码' onClick={this.changeAuthImg} />
                  <a href='javaScript:;' onClick={this.changeAuthImg}>换一张?</a>
                </Col>
              </Row>

            </FormItem>
            <FormItem>

              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住用户</Checkbox>
              )}
              <a className='login-form-forgot' href=''>忘记密码</a>
              <Button type='primary' htmlType='submit' className='login-form-button' loading={this.state.loading}>
                登 录
              </Button>
              <a href=''>新用户注册</a>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(Login);
const mapStateToProps = state => {
  return {
    token: state.currentUser.token,
    clientId: state.currentUser.clientId
  };
};

export default withRouter<any>(connect(mapStateToProps)(WrappedNormalLoginForm));