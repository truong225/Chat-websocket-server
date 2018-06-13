import React from 'react';
import MessageList from './MessageList';
import Input from './Input';
import User from '../user/User';
import './AppMes.css';
import Head from './../Head';
import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //Khởi tạo state,
    this.state = {
      open: false,

      messages: [

      ],
      nameUserChat: null,
      user: null,
    }
    var socket=new SockJS('http://localhost:8080/ws')
    this.stomp=Stomp.over(socket);
  }

  sendnewMessage(msg){
    this.stomp.send('/app/')
  }
  
  render() {
    return (
      <div className="app__content">
        <Head />
        <div className="row">
          <div className="col-sm-4">
            <User ref='userName' />
          </div>
          <div className="col-sm-8">
            <div className="chat_window">
              <MessageList user={this.state.user} messages={this.state.messages} typing={this.state.typing} />
              <Input
                ref='inputChat'
                sendMessage={this.sendnewMessage.bind(this)}
                textChat={this.state.textChat}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}