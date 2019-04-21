import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

function TimeAdjuster({time, downArrowClick, upArrowClick, timeAdjusterName}) {
    return (
        <React.Fragment>
            <span className='container'>
                <h4 className='header'>{timeAdjusterName}</h4>
                <span onClick={upArrowClick} className='arrowUp'><FontAwesomeIcon icon={faArrowUp}/></span>
                <span className='time'>{time}</span>
                <span onClick={downArrowClick} className='arrowDown'><FontAwesomeIcon  icon={faArrowDown} /></span>
            </span>
        </React.Fragment>
        
        
    )
}

TimeAdjuster.propTypes = {
    time: PropTypes.number.isRequired,
    timeAdjusterName: PropTypes.string.isRequired
};

export default TimeAdjuster