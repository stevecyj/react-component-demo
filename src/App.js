import './index.css';
import React from 'react';

function SonF(props) {
  return (<div>
    我是函數子組件,{props.list.map(item => <p key={item}>{item}</p>)}
    {props.userInfo.name}
    <button onClick={props.getMsg}>trig function in parent</button>
    {props.child}
  </div>);
}

class SonC extends React.Component {
  render() {
    return (<div>我是類子組件, {this.props.msg}</div>);
  }
}

class App extends React.Component {
  state = {
    message: 'this is message', list: [ 1, 2, 3 ], userinfo: {
      name: 'cp', age: 30
    }
  };

  getMsg = () => {
    console.log('function in parent');
  };

  render() {
    return (<div>
      <SonF list={this.state.list} userInfo={this.state.userinfo} getMsg={this.getMsg}
            child={<span>this is span</span>}/>
      <hr/>
      <SonC msg={this.state.message}/>
    </div>);
  }
}

export default App;
