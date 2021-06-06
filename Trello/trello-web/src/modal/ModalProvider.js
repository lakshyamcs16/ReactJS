import React from "react";
import { ModalContext as Context } from "../contexts/ModalContext";
import { useContext } from "react";
import './ModalProvider.css';

// A modal provider that wraps all the lists and can be used to display a modal while adding a new item
class ModalProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Component: {},
            isOpen: false,
            event: null
        };
    }

    openModal = (e, Component) => {
        this.setState({ isOpen: true, Component, event: e });
    };

    closeModal = (e) => {
        this.setState({ isOpen: false });
    };

    closeModalOnOverlay = (e) => {
        if(e?.target?.id === "overlay") {
            this.closeModal();
        }
    }

    render() {
        const Component = this.state.Component;
        return (
            <Context.Provider
                value={{
                    openModal: this.openModal,
                    closeModal: this.closeModal
                }}
            >
                {this.props.children}
                {this.state.isOpen && (
                    <div id="overlay" className="wrapper" onClick={this.closeModalOnOverlay}>
                        <div className="inner">
                            <div className="header">
                                <div className="title">
                                    {this.props.title}
                                </div>
                                <div>
                                    <button className="cross" onClick={this.closeModal}>
                                        X
                                    </button>
                                </div>
                            </div>
                            <div><Component {...this.props} event={this.state.event} /></div>
                        </div>
                    </div>
                )}
            </Context.Provider>
        );
    }
}

ModalProvider.contextType = Context;

export function useModal() {
    const ctx = useContext(Context);
    return [ctx.openModal, ctx.closeModal];
}

export default ModalProvider;
