import React from 'react';
import MessageItem from './ItemMessages';


export default class MessageList extends React.Component {
    render() {
        console.log(this.props.messages);
        return (
            <div className="messages">
                <ul>
                    {this.props.messages.map(item =>
                        <MessageItem key={item.id} user={item.userId === this.props.user ? true : false} message={item.message} userName={item.userName} />
                    )}
                </ul>
            </div>
        )
    }
}