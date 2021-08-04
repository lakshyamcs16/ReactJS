import React from "react";
import auth from "../authentication/Authenticator";
import { IRoutingProps } from "../interface/IRoutingProps";
import ContactList from "./ContactList";
import '../styles/LoginStyle.css';
import ErrorMessage from "./ErrorMessage";

interface ILoginState {
  [key: string]: string | boolean;
}

class Login extends React.Component<IRoutingProps, ILoginState> {
  username = auth.getUser().getUserDetails().username;

  constructor(public readonly props: IRoutingProps) {
    super(props);
    this.state = {
      isError: false
    };
  }

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  render() {
    return !auth.isAuthenticated() ? (
      <div className="login-container">
        {this.state.isError && <ErrorMessage message="Invalid credentials, please try again" onClose={() => {
          this.setState({
            isError: false
          });
        }}/>}
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
                  auth.login(this.state.username as string, this.state.password as string, (isSuccess: boolean) => {
                    if(isSuccess){
                      this.props.history?.push("/home");
                    }else{
                      this.setState({
                        isError: true
                      });
                    }
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
