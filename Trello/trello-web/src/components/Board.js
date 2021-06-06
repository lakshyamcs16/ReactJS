import React, { Component } from 'react'
import List from './List';
import ListContent from './ListContent';
import ModalProvider from '../modal/ModalProvider';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        // Check if last board state is present, use it if present.
        let boardData = window.localStorage.getItem("kanban-board") || {};
        
        if (Object.keys(boardData).length > 0) {
            boardData = JSON.parse(boardData);
        }

        this.state = {
            // Maintain board data as map of arrays { listname1: [{ item 1 },{ item 2 }], listname2: [{ item 1 },{ item 2 }] }
            children: boardData,
            listName: '',
            error:''
        }
    }

    // Handle the drop of a card on another list. Do nothing if the list is the same.
    cardDroppedHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newListId = e.target.closest('.group-list-item').id;
        var data = e.dataTransfer.getData("cardItem");
        var listId = e.dataTransfer.getData("listId");

        const lists = { ...this.state.children };
        const list = lists[listId];
        if (list) {
            const itemIndex = list.findIndex((item) => item?.id === +data);
            const item = list?.[itemIndex];
            list?.splice?.(itemIndex, 1);
            lists[newListId].push(item);

            this.setState({
                children: lists,
                error:''
            });
        }
    }

    // Delete the entire list, including its child(ren)
    deleteListHandler = (e) => {
        const id = e.target.closest('.group-list-item').id;
        const index = { ...this.state?.children };
        delete index[id];
        if (index !== -1) {
            this.setState({
                children: index,
                error: ''
            });
        }
    }

    // Controlled component { save list's name with onChange event handler }
    listNameHandler = (e) => {
        this.setState({
            listName: e.target.value,
            error:''
        });
    }

    // Add a new list { basic validations done }
    addItemToListHandler = () => {

        const name = this.state.listName.trim();
        if (name.length > 0 && !this.state.children[name]) {
            const listName = {};
            listName[name] = [];
            this.setState({
                children: { ...this.state.children, ...listName },
                error: ''
            });
        }else{
            if(name.length < 1) {
                this.setState({
                    error: `Listname cannot be blank`
                });
            }else{
                this.setState({
                    error: `Listname '${name}' already exists!`
                });
            }
            return;
        }
    }

    // Add an item to the list using the button present at the bottom of every list
    // Assumption: Items can have same title (within and in separate lists as well)
    addCardHandler = (e, content) => {
        const id = e.target.closest('.group-list-item').id;
        const dateObj = new Date();
        const createdAt = `${dateObj.toDateString()} ${dateObj.toLocaleTimeString()}`;
        const timestamp = dateObj.getTime();
        const lists = { ...this.state?.children };
        const list = lists[id];
        list.push({
            title: content?.title || "Title",
            description: content?.desc || "Description",
            createdat: createdAt,
            key: timestamp,
            id: timestamp
        });

        this.setState({
            children: lists,
            error:''
        });
    }

    // Delete a particular item within a list
    deleteCardHandler = (e) => {
        const listId = e.target.closest('.group-list-item').id;
        const id = e.target.closest('.card-container').id;
        const allItems = { ...this.state?.children };
        const index = allItems?.[listId];
        const itemToDelete = index.findIndex(item => item.id === +id);

        if (index !== -1) {
            index.splice?.(itemToDelete, 1);
            this.setState({
                children: allItems,
                error:''
            });
        }
    }

    // Save board's state to local storage 
    componentDidUpdate() {
        window.localStorage.setItem("kanban-board", JSON.stringify(this.state.children));
    }

    // Render the list with items inside it {if any}
    render() {
        return (
            <div className="board-background">
                <div className="board-header">
                    {this.state.error.length > 0 && <div className="error">{this.state.error}</div>}
                    <input type={"text"} onChange={this.listNameHandler} value={this.state.listName} />
                    <button onClick={this.addItemToListHandler}>Add List</button>
                </div>
                <ModalProvider title="Add a new card" onSave={this.addCardHandler}>
                    <List.Group>
                        {Object.entries(this.state.children).map(([key, value]) => {
                            return <List.Item
                                title={key}
                                key={key}
                                deleteListHandler={this.deleteListHandler}
                                id={key}>
                                <ListContent
                                    key={key}
                                    onDrop={this.cardDroppedHandler}
                                    items={value}
                                    deleteCardHandler={this.deleteCardHandler} />
                            </List.Item>
                        })}
                    </List.Group>
                </ModalProvider>
            </div>
        )
    }
}

export default Board;