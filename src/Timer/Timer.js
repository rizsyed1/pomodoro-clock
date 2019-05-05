import React from 'react'; 
import './Timer.css';
import PropTypes from 'prop-types';

let timeDisplay = (minutes, seconds) => {
    if ((minutes).toString().length < 2 && (seconds).toString().length < 2){
        return `0${minutes}:0${seconds}`
    } else if ((minutes).toString().length < 2 && (seconds).toString().length >= 2) {
        return `0${minutes}:${seconds}`
    } else if ((minutes).toString().length >= 2 && (seconds).toString().length < 2){
        return `${minutes}:0${seconds}`
    } else {
        return `${minutes}:${seconds}`
    }
}

function Timer({workMinutes, workSeconds, workTimer, breakMinutes, breakSeconds}) {
    if(workTimer) {
        return (
            <>
                <div className='container'>
                    <p>Session</p>
                    <p>{timeDisplay(workMinutes, workSeconds)}</p>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='container'>
                    <p>Session</p>
                    <p>{timeDisplay(breakMinutes, breakSeconds)}</p>
                </div>
            </>
        )
    }
    
}

export default Timer; 