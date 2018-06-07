import React, {Component} from "react";
import SocketConnection from './SocketConnection'

const notifyLabel={
    color: "red",
    fontSize: "10px"
};

export default class SingIn extends Component {
    constructor(props) {
        super(props);

        var stomp = SocketConnection.stomp;
        stomp.connect({}
            , function onConnect(data){
                stomp.subscribe("/public/login", this.receive);
            }
            , function onError(error) {
            alert("WebSocket error: " + error);
        });

        this.state = {
            user: '',
            password: '',
            stompClient: stomp
        };


    }

    receive(message){
        const receivedMessage=JSON.parse(message);
        if(this.receivedMessage.type == 'error'){
        }
        else{
            this.props.onClickAdd();
        }
    }

    handleUserChange(e) {
        this.setState({ user: e.target.value })
    }
    
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    signIn() {
        var messagePayload = {
            "username": this.state.user,
            "password": this.state.password
        }
        this.state.stompClient.send("/app/chat/login", {}, JSON.stringify(messagePayload));
    }

    render() {
        return (
            <div className="content">
                <form className="form-signup">
                    <h2 className="form-signup-heading"> Please sign up </h2>
                    <label htmlFor="inputUser" className="sr-only"> User Name </label>
                    <input type="user" onChange={this.handleUserChange.bind(this)} id="inputUser" className="form-control" placeholder="User name" required autoFocus />
                    <br/>
                    <label htmlFor="inputPassword" className="sr-only"> Password </label>
                    <input type="password" onChange={(e) => {
                        this.handlePasswordChange(e);
                    }} id="inputPassword" className="form-control" placeholder="Password" required />
                    <br/>
                    <label className={notifyLabel} ref={this.errorText}>{this.errorText}</label>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn.bind(this)} type="button" > Sign in </button>
                </form>
            </div>

        );
    }
}