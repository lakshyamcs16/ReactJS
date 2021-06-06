import React, { Component } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import './NewCardModal.css';

// The Component that is rendered inside the modal
export default class NewCardModal extends Component {
    static contextType = ModalContext;

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            error:''
        };
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error:''
        });
    }

    onSaveHandler = (e, closeModal) => {
        const {
            title,
            desc
        } = this.state;

        if(title.trim().length < 1) {
            this.setState({
                error: 'Title cannot be empty'
            });
            return;
        }else if(desc.trim().length < 1) {
            this.setState({
                error: 'Description cannot be empty'
            });
            return;
        }

        this.props.onSave(this.props.event, this.state);
        closeModal();
    }

    render() {
        return (
            <>
                <div id="error" style={{ visibility: this.state.error.length > 0? 'visible' : 'hidden'}}>{this.state.error}</div>
                <ModalContext.Consumer>
                    {value => {
                        return <div className="add-card-modal">
                            <div className="title">
                                <label htmlFor="title">Title</label>
                                <input required type="text" name="title" id="title" placeholder="Title" value={this.state.title} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="description">
                                <label htmlFor="desc">Description</label>
                                <textarea required type="text" name="desc" id="desc" placeholder="Description of the task" value={this.state.desc} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="submit">
                                <button onClick={(e) => this.onSaveHandler(e, value.closeModal)}>Okay</button>
                            </div>
                        </div>
                    }
                    }</ModalContext.Consumer>
            </>
        )
    }
}
