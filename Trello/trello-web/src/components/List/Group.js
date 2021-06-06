import React from 'react';
import './Group.css';

//Multiple lists are grouped using group component for modularity
export default function Group(props) {
    return (
        <div className="group-items">
            {props.children}
        </div>
    )
}
