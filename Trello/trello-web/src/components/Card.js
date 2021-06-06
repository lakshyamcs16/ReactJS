import React from 'react';
import './Card.css';
import { cardDragEndHandler, cardDragStartHandler } from '../handlers/CardHandlers';
import DnD from './DnD';

class Card extends React.Component {
    // Attach drag-and-drop events using HOC DnD and render item within a list
    render() {
        const { title = ' ', description = ' ', createdat = ' ' } = this.props;

        if (!title || !description) {
            throw new Error('Title or Description is missing');
        }

        const  {
            draggable,
            onDragStart,
            onDragEnd,
            id
        } = this.props;

        const draggableAPI = {draggable, onDragEnd, onDragStart, id};

        return (
            <div className="card-container" {...draggableAPI} >
                <div className="header">
                    <div><div><span>{title}</span></div><div className="created-at"><span>{createdat}</span></div></div>
                    <button className="delete-btn" onClick={this.props.deleteCardHandler}>X</button>
                </div>
                <div className="description">
                    <div>
                        {description}
                    </div>
                </div>
            </div>
        )
    }
}

const properties = {
    draggable: true
};

const events = {
    ondragend: cardDragEndHandler,
    ondragstart: cardDragStartHandler
};

export default DnD(properties, events)(Card);