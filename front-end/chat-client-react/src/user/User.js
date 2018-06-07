import React from 'react';
import ItemUser from './ItemUser';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameList: [],
            name: null,
        }
    }
    updateUser(listUser) {
        this.setState({ userNameList: listUser });
    }
    render() {
        return (
            <div className="chat_user">
                    {this.state.userNameList.map(item =>
                        <ItemUser name={item.userName} />
                    )}
            </div>
        );
    }
}