import React from 'react';

const names = [ 'Timms', 'Pumbs' ]
function RandomTextContainer(props) {
    console.log('redering');

    return (        
        <div>
            <div>Name: {props.text? props.text : null}</div>
            <button onClick={() => { props.set(names[Math.round(Math.random())]) }} >Generate</button>
            <button onClick={props.clear} >Clear</button>
        </div>
    );
}

export default React.memo(RandomTextContainer);