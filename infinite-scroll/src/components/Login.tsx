import React from "react";
import auth from "../authentication/Authenticator";
import { IRoutingProps } from "./ContactList";
import ContactList from "./ContactList";
import '../styles/LoginStyle.css';

interface ILoginState {
  [key: string]: string;
}

class Login extends React.Component<IRoutingProps, ILoginState> {
  username = auth.getUser().getUserDetails().username;

  constructor(public readonly props: IRoutingProps) {
    super(props);
    this.state = {};
  }

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  render() {
    return !auth.isAuthenticated() ? (
      <div className="login-container">
        <div className="company-logo">
          <span className="company-title">Contact List</span>
          <div className="company-phrase">Connect with your friends through web</div>
        </div>
        <div>
          <div>
            <div className="form-container">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                onChange={(e) => this.onChangeHandler(e)}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => this.onChangeHandler(e)}
              />
              <div className="divider"></div>
              <button
                className="login"
                onClick={() => {
                  auth.login(this.state.username, this.state.password, () => {
                    this.props.history?.push("/home");
                  });
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <ContactList name={this.username} />
    );
  }
}

export default Login;
