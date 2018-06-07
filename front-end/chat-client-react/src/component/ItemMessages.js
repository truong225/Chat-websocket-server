import React from 'react';
import arrayEmoji from '././ArrayEmoji';


export default class MessageItem extends React.Component {
    render() {

        var chat = this.props.message;
        var chatTextArray = [];
        for (var i = 0; i < arrayEmoji.length; i++) {
            var index = chat.indexOf(arrayEmoji[i].text);
            if (index >= 0) {
                var str1 = chat.slice(0, index);
                var str2 = chat.slice(index + arrayEmoji[i].text.length, chat.length);
                var img = (<img src={arrayEmoji[i].image} alt='' />);
                chatTextArray.push(str1);
                chatTextArray.push(img);
                chatTextArray.push(str2);
            }
        }
        if (chatTextArray.length === 0) {
            chatTextArray.push(chat);
        }

        return (
            <div className={this.props.user ? "message right appeared" : "message left appeared"}>
                <div className="avatar">
                    {this.props.userName}
                </div>
                <div className="text_wrapper">
                    <div className="text">
                        {/* {isEmoji ? <img src={require('./../images/angry.png')} /> : this.props.message} */}
                        {chatTextArray.map((item, index) => item)}
                    </div>
                </div>
            </div>
        )
    }
}