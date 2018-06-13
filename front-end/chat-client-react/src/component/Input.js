import React from 'react';

export default class Input extends React.Component {
    enterKey(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            this.props.sendMessage(this.refs.message);
            this.setState({textChat: ''})
        }
    }

    updateTextChat(text){
        this.setState({
            textChat: this.state.textChat + text
        });
    }

    handleClickOpen() {
        this.props.onClickOpenAdd();
    }

    handleShowEmojiItem(text){
        console.log(text);
    }
    handleClickClose(){
        this.props.onCLickCloseAdd();       
    }
    handleTextChange(event) {
        this.setState({textChat: event.target.value  })
      }
    render() {
    
        return (
            <div className="bottom_wrapper clearfix">
                <div className="message_input_wrapper">
                    <input
                        ref="message" className="message_input"
                        placeholder="Type your message here..."
                        onKeyUp={(e) => this.enterKey(e)} 
                        onChange={this.handleTextChange.bind(this)}
                        value={this.state && this.state.textChat ? this.state.textChat : ''}
                        />
                </div>
                <div className="sc-user-input--button">
                    <img
                        src={require('./../images/iconEmoji.png')}
                        onClick={this.handleClickOpen.bind(this)} 
                        alt='' />
                </div>
                <div className="send_message" 
                    onClick={() => {
                        this.props.sendMessage(this.refs.message);
                        this.setState({textChat: ''});
                    }}
                    >
                    <div className="text"  onClick ={this.handleClickClose.bind(this)} >Send</div>
                </div>
            </div>
        )
    }
}