import React from 'react';

export default class ItemUser extends React.Component {
    // constructor(props){
    //     super(props);
    //      this.state = { 
    //         userNameList: []        
    //      }
    // }
    // updateUserName(e){
    //     const userNameList = this.state.userNameList
    //     userNameList.push({
    //          nameUser: e
    //     });
    //     this.setState({userNameList: userNameList});
    // }

    render() {
        
        return (
            <div>
                <div className="avatar_user_name"></div>
                <div className="user_name">
                    {this.props.name}
                </div>
            </div>
        );

    }
}