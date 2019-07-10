import React from 'react';
import './Loader.css';

const Loader = (props) => (
    <div className={`${props.position ? 'position ' : ''}loader`}>
        <div className="spinner-border text-success" role="status">
            <span className="sr-only">{props.message}</span>
        </div>
    </div>
);

Loader.defaultProps = {
    message: 'Loading...'
}

export default Loader;