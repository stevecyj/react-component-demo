import './index.css';
import React from 'react';

function SonF({ list, userInfo, getMsg, child, getSonMsg }) {
  // const { list, userInfo, getMsg, child } = props;
  function clickHandler() {
    getSonMsg('message from children component');
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

function SonA({ sendAMsg }) {
  return (
    <>
      <div>this is A</div>
      <br/>
      sendAMsg:{sendAMsg}
    </>
  );
}

function SonB({ getBMsg }) {
  const bMsg = 'B組件的資料';
  return (<>
    <div>this is B</div>
    <button onClick={() => getBMsg(bMsg)}>發送資料</button>
  </>);
}

class SonC extends React.Component {
  render() {
    return (<div>我是類子組件, {this.props.msg}</div>);
  }
}

class App extends React.Component {
  state = {
    message: 'this is message',
    list: [ 1, 2, 3 ], userinfo: {
      name: 'cp', age: 30
    },
    sendAMsg: '測試父傳子'
  };

  getMsg = () => {
    console.log('function in parent');
  };

  getSonMsg = (childMsg) => {
    console.log(childMsg);
  };

  getBMsg = (msg) => {
    console.log(msg);
    this.setState({ sendAMsg: msg });
  };

  render() {

    return (<div>
      <SonF list={this.state.list} userInfo={this.state.userinfo} getMsg={this.getMsg}
            child={<span>this is span</span>} getSonMsg={this.getSonMsg}/>
      <hr/>
      <SonC msg={this.state.message}/>
      <SonA sendAMsg={this.state.sendAMsg}/>
      <SonB getBMsg={this.getBMsg}/>
    </div>);
  }
}

export default App;
