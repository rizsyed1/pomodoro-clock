import React from 'react'; 
import './Timer.css';
import PropTypes from 'prop-types';
import CountDownTimer from '../CountDownTimer/CountDownTimer.js';

function Timer({workTime,restTime}) {
    return (
        <>
            <div className='container'>
                <p>Session</p>
                <CountDownTimer workTime={workTime} restTime={restTime}/>
            </div>
        </>
    )
}

export default Timer; 