import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './TimeAdjuster.css'

let timeDisplay = ( seconds ) => {
    let returnedMinutes = Math.floor(seconds / 60)
    return returnedMinutes
}

function TimeAdjuster({time, downArrowClick, upArrowClick, timeAdjusterName}) {
    return (
        <div className='timeContainer'>
            <span className='header'>{timeAdjusterName}</span>
            <br />
            <span onClick={upArrowClick} className='arrow'><FontAwesomeIcon icon={faArrowUp}/></span>
            <span className='time'>{timeDisplay(time)}</span>
            <span onClick={downArrowClick} className='arrow'><FontAwesomeIcon  icon={faArrowDown} /></span>
        </div>
    )
}

TimeAdjuster.propTypes = {
    time: PropTypes.number.isRequired,
    timeAdjusterName: PropTypes.string.isRequired
};

export default TimeAdjuster