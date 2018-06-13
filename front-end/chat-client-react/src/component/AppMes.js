import React from 'react';
import $ from 'jquery';
import MessageList from './MessageList';
import Input from './Input';
import _map from 'lodash/map';
import io from 'socket.io-client';
import EmojiList from './EmojiList';
import User from '../user/User';
import './AppMes.css';
import Utils from './../Utils';
import Head from './../Head';

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
    this.socket = null;
    this.socket = io('localhost:6969');
  }
  //Connetct với server nodejs, thông qua socket.io
  componentWillMount() {
    this.socket.emit("connected", Utils.data);
    this.socket.on('id', res => this.setState({ user: res })) // lắng nghe event có tên 'id'
    this.socket.on('newMessage', (response) => { this.newMessage(response) }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    this.socket.on('userConnected', (listUser) => { this.userConnected(listUser) });
  }

  userConnected(listUser) {

    this.refs.userName.updateUser(listUser);
  }
  //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
  newMessage(data) {
    const msgs = this.state.messages;
    let ids = _map(msgs, 'id');
    let max = Math.max(...ids);
    msgs.push({
      id: max + 1,
      userId: data.id,
      message: data.data.values,
      userName: data.data.nameChat
    });

    let objMessage = $('.messages');
    if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight) {
      this.setState({ messages: msgs });
      objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 400); //tạo hiệu ứng cuộn khi có tin nhắn mới

    } else {
      this.setState({ messages: msgs });
      if (data.id === this.state.user) {
        objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 400);
      }
    }
  }

  //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn
  sendnewMessage(m) {
    if (m.value) {
      this.socket.emit("newMessage", { values: m.value, nameChat: Utils.data }); //gửi event về server
      m.value = "";
    }
  }


  handleOpenEmoji() {
    this.setState({
      open: !this.state.open
    });
  }

  handleCloseEmoji() {
    this.setState({
      open: false
    });
  }

  handleSetItemEmoji(text) {
    this.setState({
      textChat: text
    });
    this.refs.inputChat.updateTextChat(text);
  }

  render() {

    let open = this.state.open;
    let openEmoji = null;

    if (open) {
      openEmoji = <EmojiList
        onClick={this.handleSetItemEmoji.bind(this)}
      />
    }

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
                onClickOpenAdd={this.handleOpenEmoji.bind(this)}
                onCLickCloseAdd={this.handleCloseEmoji.bind(this)}
                textChat={this.state.textChat}
              />
              {openEmoji}
            </div>
          </div>
        </div>
      </div>
    )
  }
}