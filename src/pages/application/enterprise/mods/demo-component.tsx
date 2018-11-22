import * as React from 'react';

class DemoComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        id: 1,
        name: 'tian'
    };
    show = () => {
        this.setState(state => {
            return {
                id: state.id + 1,
                name: 'xiao'
            };
        });
        this.props.callback('son');
    }
    render() {
        return (
            <div>欢迎来到 {this.props.id}
                <p>{this.state.id}</p>
                <p>{this.state.name}</p>
                <button onClick={this.show} >dianjiwo</button>
            </div>);
    }
}

export default DemoComponent;