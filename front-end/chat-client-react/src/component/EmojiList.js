import React from 'react';
import arrayEmoji from './ArrayEmoji';
import EmojiItem from './ItemEmoji';




// function createView(itemEmoji) {
//     return <div className="icon_emoji">
//         {itemEmoji}
//     </div>
// }


export default class EmojiList extends React.Component {
    onClickItemEmoji(text) {
    }


    render() {

        const Emojilist = arrayEmoji.map((emoji, index) => {
            return <EmojiItem key={index} text={emoji.text}
                image={emoji.image} onClickItem={this.props.onClick.bind(this, emoji.text)} >
            </EmojiItem>
        });

        // var itemEmoji = [];
        // var arrEmoji = [];
        // for (var i = 0; i < Emojilist.length; i++) {
        //     itemEmoji.push(arrayEmoji[i]);
        //     if ((i % 5) === 0 && i > 0) {
        //         var view = createView(itemEmoji);
        //         arrEmoji.push(view);
        //         itemEmoji = [];
        //     }
        // }
        return (
            <div className="chat_emoji">
                <div className="icon_emoji">
                    {Emojilist}
                </div>
                {/* {arrEmoji} */}
            </div>
        );

    }
}