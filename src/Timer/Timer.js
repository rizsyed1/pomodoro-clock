import React from 'react'; 
import './Timer.css';

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

function Timer({timeLeft, workTimer, timeAdjusterWorkTime}) {
    if(workTimer === ''){
        return (
            <div className='timerContainer'>
                <span className='titleSession'>Session</span>
                <span className='timeDisplay'>{timeDisplay(timeAdjusterWorkTime)}</span>
            </div>
        )  
    } else {
        return (
            <div className='timerContainer'>
                <span className='titleSession'>Session</span>
                <span className='timeDisplay'>{timeDisplay(timeLeft)}</span>
            </div>
        )  
    }
        
}

export default Timer; 