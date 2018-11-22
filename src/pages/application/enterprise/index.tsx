import * as React from 'react';
import MyUpload from 'src/components/MyUpload/index';
import { Button } from 'antd';
class RegistrationForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    imgs: ['s3/M00/00/19/rB4r9Fv2Zs6ANvDeAAWyhJ07vXM110.jpg']
  };
  setUrl = (imgs) => {
    this.setState({
      imgs
    });
  }
  private callback(evt): void {
    console.log(evt);
  }

  render() {
    return (<div>
      <MyUpload max='1' setUrl={this.setUrl} fileList={this.state.imgs} />
      <p>图片地址：
        {
          this.state.imgs.map((number) =>
            <span key={number}>{number}</span>
          )
        }
      </p>
      <p>
        <Button type='primary' onClick={this.callback}>提交</Button>
      </p>
    </div>);
  }
}

export default RegistrationForm;