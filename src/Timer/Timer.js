import React from 'react'; 
import './Timer.css';
import PropTypes from 'prop-types';

let timeDisplay = ( seconds) => {
        let returnedMinutes = Math.floor(seconds / 60)
        let returnedSeconds = Math.floor(seconds % 60)
        if (returnedSeconds.toString().length < 2 && returnedMinutes.toString().length < 2) {
            return `0${returnedMinutes}:0${returnedSeconds}`

        } else if (returnedMinutes.toString().length < 2) {
            return `0${returnedMinutes}:${returnedSeconds}`

        } else if (returnedSeconds.toString().length < 2) {
            return `${returnedMinutes}:0${returnedSeconds}`

        } else {
            return `${returnedMinutes}:${returnedSeconds}`
        }
}

function Timer({timeLeft}) {
        return (
                <div className='container'>
                    <p>Session</p>
                    <p>{timeDisplay(timeLeft)}</p>
                </div>
        )  
}

export default Timer; 