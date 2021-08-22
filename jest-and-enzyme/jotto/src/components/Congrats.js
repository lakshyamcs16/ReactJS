import React from 'react';
import PropTypes from 'prop-types';


function Congrats(props) {
    if (props.success) {
        return (<div data-test="component-congrats" className="alert alert-success">
            <span data-test="congrats-message">Congratulations! You have guessed the word!</span>
        </div>)
    } else {
        return <div data-test="component-congrats"></div>
    }
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
};

export default Congrats;