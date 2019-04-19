import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

function TimeAdjuster({time}) {
    return (
        <React.Fragment>
            <div>
                <FontAwesomeIcon icon={faArrowUp} />
                <span>{time}</span>
                <FontAwesomeIcon icon={faArrowDown} />
            </div>
        </React.Fragment>
        
        
    )
}

TimeAdjuster.propTypes = {
    time: PropTypes.number.isRequired
};

export default TimeAdjuster