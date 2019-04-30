import React from 'react'; 
import './Timer.css';
import PropTypes from 'prop-types';

function Timer({minutes, seconds}) {
    return (
        <>
            <div className='container'>
                <p>Session</p>
                <p>{minutes}" + ':' + "{seconds}</p>
            </div>
        </>
    )
}

export default Timer; 