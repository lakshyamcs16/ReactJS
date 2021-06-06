import React from 'react';

// A HOC that takes properties, events and returns a Component that can connect the Component to the events {limited to DnD events yet}.
export default function DnD(properties = {}, events) {
    return function(Component) {
        const defaultProperties = {
            draggable: false
        };

        if(Object.keys(events).length < 1) {
            throw new Error('There must be at least one event handler for DnD API');
        }

        if(properties === null || properties === undefined) {
            properties = defaultProperties;
        }

        return class extends React.Component {
            render() {
                const {
                    ondrag = null,
                    ondragend = null,
                    ondragenter = null,
                    ondragexit = null,
                    ondragleave = null,
                    ondragover = null,
                    ondragstart = null,
                    ondrop = null } = events;
                const {
                    draggable = false
                } = properties;
    
                return <Component
                    draggable={draggable}
                    onDrag={ondrag}
                    onDrop={ondrop}
                    onDragEnter={ondragenter}
                    onDragEnd={ondragend}
                    onDragExit={ondragexit}
                    onDragLeave={ondragleave}
                    onDragOver={ondragover}
                    onDragStart={ondragstart}
                    {...this.props} />;
            }
        };
    }
}
