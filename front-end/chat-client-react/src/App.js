import React from 'react';
import './App.css';
import AppMes from './component/AppMes';
import SignIn from './SignIn';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // khỏi tạo state ẩn hiện ChatMessages
      isShowMes: false,
    }
  }
  handleTogleMes() {
    this.setState({
      isShowMes: !this.state.isShowMes,

    });
  }

  render() {
    let isShowMes = this.state.isShowMes;
    
    let elem = <SignIn
      onClickAdd={this.handleTogleMes.bind(this)} />;
      if (isShowMes === true) {
        elem = <AppMes />
      }
    
    return (
      <div className="contented">
        {elem}
      </div>
    );
  }
}