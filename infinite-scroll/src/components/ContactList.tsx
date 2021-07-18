import React from "react";
import auth from '../authentication/Authenticator';
import { History, LocationState } from "history";
import Contacts from './Contacts';
import '../styles/ContactListStyle.css';

export interface IRoutingProps {
  history?: History<LocationState>;
  location?: Location;
  match?: string;
  name: string | null;
}

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
