import React from 'react';
import './Item.css';

// A list that may have multiple items/tasks.
export default function Item(props) {

    const { title, children, deleteListHandler, id } = props;
    if(!title) {
        throw new Error('Title is a required field');
    }

    return (
        <div className="group-list-item" id={id}>
            <div className="header">
                <span>{title}</span>
                <button className="delete-btn" onClick={deleteListHandler}>X</button>
            </div>
            <div className="children">
                {children}
            </div>
        </div>
    )
}
