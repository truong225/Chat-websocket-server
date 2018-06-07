import React from 'react';

export default class EmojiItem extends React.Component {
    handleSetEmojiItem() {
    }
    render() {
        return (

            <div>
                <h4>
                    <img src={this.props.image} onClick={this.props.onClickItem.bind(this)} alt='' />
                </h4>
            </div>
        );
    }
}