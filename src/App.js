import './index.css';
import React from 'react';

function SonF({ list, userInfo, getMsg, child,getSonMsg }) {
  // const { list, userInfo, getMsg, child } = props;
  function clickHandler(){
    getSonMsg('message from children component')
  }
  
  return (<div>
    我是函數子組件,{list.map(item => <p key={item}>{item}</p>)}
    {userInfo.name}
    <button onClick={getMsg}>trig function in parent</button>
    {child}
    <hr/>
    <button onClick={clickHandler}>son button</button>
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

  getSonMsg = (childMsg) => {
    console.log(childMsg);
  };

  render() {
    return (<div>
      <SonF list={this.state.list} userInfo={this.state.userinfo} getMsg={this.getMsg}
            child={<span>this is span</span>} getSonMsg={this.getSonMsg}/>
      <hr/>
      <SonC msg={this.state.message}/>
    </div>);
  }
}

export default App;
