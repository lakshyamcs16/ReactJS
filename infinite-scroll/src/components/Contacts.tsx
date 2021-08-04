import auth from "../authentication/Authenticator";
import FlatList from "./FlatList";
import React from "react";
import UserData from "../data/Users.json";
import AdultManAvatar from '../assets/man-adult.png';
import Loader from './Loader';
import "../styles/ContactListStyle.css";
import {IContact} from '../interface/IFlatList';

export function debounce<T extends unknown[], U>(
    callback: (...args: T) => PromiseLike<U> | U,
    wait: number
  ) {
    let timer: NodeJS.Timeout;
  
    return (...args: T): Promise<U> => {
      clearTimeout(timer);
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(callback(...args)), wait);
      });
    };
}

class Contacts extends React.Component<any, {renderableData: IContact[], isLoading: boolean}> {
  username = auth.getUser().getUserDetails().username;

  constructor(props: {}) {
      super(props);
        this.state = {
            renderableData: [],
            isLoading: false
        }
  }

  componentDidMount() {
      this.setState({
          renderableData: UserData.slice(0, 10)
      });
  }
  
  renderAnswers = (item: IContact) => {
    const { address } = item;
    return (
      <>
        <div className="user-background-image"><div className="avatar-container"><img src={AdultManAvatar} alt="Avatar" height={105} width={100} /></div></div>
        <div className="user-details-container">
          <div className="name">
            <span>{item.name}</span>
          </div>
          <div className="address">
            {address?.street}, {address?.suite} <br /> {address?.city}, {address?.zipcode}
          </div>
          <div className="email">{item.email}</div>
          <div className="phone">{item.phone}</div>
        </div>
      </>
    );
  };

  updateContactList = () => {
    this.setState(({renderableData}) => {
        const endItemIndex = Math.min(renderableData.length + 5, UserData.length);

        return {
            renderableData: [
                ...renderableData,
                ...UserData.slice(renderableData.length, endItemIndex),
            ],
            isLoading: false
        }
    })
  }

  handleScrollCallback = (e: Event) => {
    if(this.state.renderableData.length >= UserData.length) {
        return;
    }
    
    this.setState({
        isLoading: true
    }, () => {
        e.stopImmediatePropagation();
        const debouncedHandler = debounce(this.updateContactList, 1000);
        debouncedHandler();
    });
  };

  render() {
    return (
      <div>
        <div className="welcome"><span> Welcome, </span> <span>{this.username}</span></div>
        <div>
          <FlatList
            data={this.state.renderableData}
            render={(item) => this.renderAnswers(item)}
            keyExtractor={(item) => item.id}
            callback={this.handleScrollCallback}
            classes="user-list-item"
          />
          <div style={{height: '5rem'}}>{this.state.isLoading && <Loader />}</div>
        </div>
      </div>
    );
  }
}

export default Contacts;
