import React from 'react'; 
import './Timer.css';
import PropTypes from 'prop-types';

function Timer({workMinutes, workSeconds, workTimer, breakMinutes, breakSeconds}) {

    if(workTimer) {
        return (
            <>
                <div className='container'>
                    <p>Session</p>
                    <p>{workMinutes}:{workSeconds}</p>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='container'>
                    <p>Session</p>
                    <p>{breakMinutes}:{breakSeconds}</p>
                </div>
            </>
        )
    }
    
}

export default Timer; 