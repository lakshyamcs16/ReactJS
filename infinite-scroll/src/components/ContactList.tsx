import React from "react";
import auth from '../authentication/Authenticator';
import Contacts from './Contacts';
import '../styles/ContactListStyle.css';
import {IRoutingProps} from '../interface/IRoutingProps';

class ContactList extends React.Component<IRoutingProps> {
  render() {
    return (
      <div>
        <button
          className="logout"
          onClick={() => {
            auth.logout(() => {
              window.location.href = "/";
            });
          }}
        >
          Logout
        </button>
        <Contacts />
      </div>
    );
  }
}

export default ContactList;
