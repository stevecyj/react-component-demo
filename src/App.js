import './index.css';
import React from 'react';

function SonF(props) {
  return (
    <div>我是函數子組件,{props.msg}</div>
  );
}

class SonC extends React.Component {
  render() {
    return (
      <div>我是類子組件, {this.props.msg}</div>
    );
  }
}

class App extends React.Component {
  state={
    message:'this is message'
  }
render() {
  return(
    <div>
      <SonF msg={this.state.message}/>
      <hr/>
      <SonC msg={this.state.message}/>
    </div>
  )
}
}

export default App;
