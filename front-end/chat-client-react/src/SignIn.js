import React, {Component} from "react";
import axios from 'axios'

export default class SingIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    handleUserChange(e) {
        this.setState({ username: e.target.value })
    }
    
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    signIn() {
        if(this.state.username === '' || this.state.password === ''){
            alert('Username or password is empty');
            return;
        }

        var messagePayload ="http://localhost:8080/signin/u="+this.state.username+"/pass="+this.state.password;
        axios.get(messagePayload).then(function(response){
            this.showMessageboard(response)
        }.bind(this))
    }

    showMessageboard(response) {
        if(response.data==='')
                alert('No username or password')
        else
            this.props.onClickAdd()
    }


    render() {
        return (
            <div className="content">
                <form className="form-signup">
                    <h2 className="form-signup-heading">Please sign up</h2>
                    <label htmlFor="inputUser" className="sr-only">User Name</label>
                    <input type="user" onChange={this.handleUserChange.bind(this)} id="inputUser" className="form-control" placeholder="User name" required autoFocus />
                    <label htmlFor="inputPassword" className="sr-only"> Password </label>
                    <input type="password" onChange={(e) => {
                        this.handlePasswordChange(e);
                    }} id="inputPassword" className="form-control" placeholder="Password" required />
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn.bind(this)} type="button"> Sign in </button>
                </form>
            </div>

        );
    }
}