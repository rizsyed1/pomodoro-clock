import React from 'react'; 
import './Timer.css';

let timeDisplay = ( seconds ) => {
        let returnedMinutes = Math.floor(seconds / 60)
        let returnedSeconds = Math.floor(seconds % 60)

        if ( returnedMinutes.toString().length < 2) {
            returnedMinutes = `0${returnedMinutes}`
        }

        if (returnedSeconds.toString().length < 2){
            returnedSeconds = `0${returnedSeconds}` 
        }

        return `${returnedMinutes}:${returnedSeconds}`
}

    


function Timer({timeLeft, workTimer, timeAdjusterWorkTime}) {
        return (
            <div className='timerContainer'>
                <span className='titleSession'>Session</span>
                <span className='timeDisplay'>{workTimer === ''? timeDisplay(timeAdjusterWorkTime): timeDisplay(timeLeft)}</span>
            </div>
        )  
    }


export default Timer; 