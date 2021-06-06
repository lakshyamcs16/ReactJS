import React, { Component } from 'react'
import Card from './Card';
import DnD from './DnD';
import './ListContent.css';
import { cardDragOverHandler } from '../handlers/CardHandlers';
import { ModalContext } from '../contexts/ModalContext';
import NewCardModal from './NewCardModal';

// Attach DnD events and consume Modal context that is used to display Modal to fill title and description of an item/task.
class ListContent extends Component {
    static contextType = ModalContext;

    constructor(props) {
        super(props);
        this.onDrop = props.onDrop;
        this.onDragOver = props.onDragOver;
    }

    render() {
        let renderableItems = this.props?.items;
        renderableItems = renderableItems?.sort?.((x, y) => y.key - x.key);
        return (
            <div className="cards-container">
                <div
                    onDrop={this.onDrop}
                    onDragOver={this.onDragOver}
                    className="children">
                    {renderableItems?.map?.(item => {
                        return (<Card
                            id={item?.id}
                            title={item?.title}
                            description={item?.description}
                            createdat={item?.createdat}
                            key={item?.key}
                            deleteCardHandler={this.props.deleteCardHandler}
                        />);
                    })}
                </div>
                <ModalContext.Consumer>
                    {value => {
                        return <div className="bottom-bar">
                            <button onClick={(e) => value.openModal(e, NewCardModal)}>
                                +
                            </button>
                        </div>
                    }}
                </ModalContext.Consumer>
            </div>
        )
    }
}

const events = {
    ondragover: cardDragOverHandler
};

export default DnD(null, events)(ListContent);

