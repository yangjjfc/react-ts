import * as React from 'react';
import { Upload, Icon, Modal } from 'antd';

class MyUpload extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }
    state = {
        max: 1,
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
        const allOk = fileList.every(item => item.status === 'done');
        if (allOk) {
            this.props.setUrl(fileList.map(data => data.response.data));
        }
    }
    handleRemove = (file) => {
        const newList = this.state.fileList.filter((item: any) => item.url === file.url);
        this.props.setUrl(newList.map((data: any) => data.response.data));
    }
    componentWillMount() {
        if (this.props.max) {
            this.setState({
                max: this.props.max
            });
        }
        if (this.props.fileList && this.props.fileList.length) {
            this.setState({
                fileList: this.props.fileList.map(url => ({
                    uid: Math.round(Math.random() * 10000),
                    name: 'xxx',
                    status: 'done',
                    url: 'http://dfs.dev.cloudyigou.com/dfs/' + url,  //后期需要根据环境变量改变
                    response: {
                        data: url
                    }
                }))
            });
        }
    }
    componentDidUpdate() {
        //
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type='plus' />
                <div className='ant-upload-text'>上传</div>
            </div>
        );
        return (
            <div className='clearfix'>
                <Upload
                    action='/gateway/upload'
                    listType='picture-card'
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                    disabled={this.props.disabled}
                >
                    {fileList.length >= this.state.max ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt='example' style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
export default MyUpload;