import './index.css';
import React, { createContext } from 'react';
import * as PropTypes from "prop-types";

const { Provider, Consumer } = createContext();

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

function ComponentA() {
  return (
    <div>
      this is ComA
      <ComponentC/>
    </div>
  );
}

function ComponentB() {
  return (
    <div>this is ComB</div>
  );
}

function ComponentC() {
  return (
    <div>
      this is ComC
      <br/>
      <Consumer>
        {value => <span>{value}</span>}
      </Consumer>
    </div>
  );
}

function Test({ list = [ 6, 7, 8 ] }) {
  return (
    <div>{list.map((item, idx) => <p key={idx}>{item}</p>)}</div>
  );
}

Test.propTypes = {
  list: PropTypes.array
};

class TestA extends React.Component {
  static defaultProps = {
    pageSize: 10
  };

  render() {
    return (
      <div>{this.props.pageSize}</div>
    );
  }
}

class TestB extends React.Component {
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    return (
      <div>this is TestB</div>
    );
  }

}

// TestA.defaultProps = {
//   pageSize: 10
// };

function ListItems({ item, delHandler, children }) {
  // children();
  return <>
    <h3>{item.name}</h3>
    <p>{item.price}</p>
    <p>{item.info}</p>
    <button onClick={() => delHandler(item.id)}>删除</button>
    {children}
  </>;
}

ListItems.propTypes = {
  item: PropTypes.any,
  onClick: PropTypes.func
};

class App extends React.Component {
  constructor() {
    super();
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  state = {
    message: 'this is message',
    list: [ 1, 2, 3 ],
    userinfo: {
      name: 'cp', age: 30
    },
    sendAMsg: '測試父傳子',
    listItems: [
      { id: 1, name: '超级好吃的棒棒糖', price: 18.8, info: '开业大酬宾，全场8折' },
      { id: 2, name: '超级好吃的大鸡腿', price: 34.2, info: '开业大酬宾，全场8折' },
      { id: 3, name: '超级无敌的冰激凌', price: 14.2, info: '开业大酬宾，全场8折' }
    ],
    count: 0,
    flag: true
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

  delHandler = (id) => {
    console.log(id);
    this.setState({ listItems: this.state.listItems.filter(item => item.id !== id) });
  };

  counterHandler = () => {
    this.setState({ count: this.state.count + 1 });
    this.setState({ flag: !this.state.flag });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
  }

  render() {
    console.log('render');

    return (
      <Provider value={this.state.message}>
        <div>
          <SonF list={this.state.list} userInfo={this.state.userinfo} getMsg={this.getMsg}
                child={<span>this is span</span>} getSonMsg={this.getSonMsg}/>
          <hr/>
          <SonC msg={this.state.message}/>
          <SonA sendAMsg={this.state.sendAMsg}/>
          <SonB getBMsg={this.getBMsg}/>
          <hr/>
          <ComponentA/>
          <hr/>
          <h6>ListItem</h6>
          <div>
            {this.state.listItems.map(item => (
              <ListItems key={item.id} item={item} delHandler={this.delHandler}>
                {/*<div>this is ListItems</div>*/}
                {/*{() => console.log(123)}*/}
                {<div>
                  <p>this is p</p>
                </div>}
              </ListItems>
            ))}
          </div>
          <Test/>
          <TestA pageSize={20}/>
          <hr/>
          <button onClick={this.counterHandler}>{this.state.count}</button>
          {this.state.flag ? <TestB/> : null}
        </div>
      </Provider>
    );
  }
}

export default App;
