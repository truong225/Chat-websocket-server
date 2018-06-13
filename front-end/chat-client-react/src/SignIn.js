import React, {Component} from "react";

export default class SingIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            password: ''
        };
    }

    handleUserChange(e) {
        this.setState({ user: e.target.value })
    }
    
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    signIn() {
        var ajax = new XMLHttpRequest();
        var url = "http://localhost:8080/test/u=" + this.state.user + "/pass=" + this.state.password;
        ajax.onreadystatechange = this.show(this,ajax.responseText);
        ajax.open("GET", url, true);
        ajax.send();
    }

    show(e, response) {
        if(response !== '' || response !== null)
            e.props.onClickAdd();
    }

    render() {
        return (
            <div className="content">
                <form className="form-signup">
                    <h2 className="form-signup-heading"> Please sign up </h2>
                    <label htmlFor="inputUser" className="sr-only"> User Name </label>
                    <input type="user" onChange={this.handleUserChange.bind(this)} id="inputUser" className="form-control" placeholder="User name" required autoFocus/>
                    <br/>
                    <label htmlFor="inputPassword" className="sr-only"> Password </label>
                    <input type="password" onChange={(e) => {
                        this.handlePasswordChange(e);
                    }} id="inputPassword" className="form-control" placeholder="Password" required />
                    <br/>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn.bind(this)} type="button" > Sign in </button>
                </form>
            </div>

        );
    }
}