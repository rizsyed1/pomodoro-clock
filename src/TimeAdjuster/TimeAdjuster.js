import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

function TimeAdjuster({time}) {
    return (
        <React.Fragment>
            <div>
                <FontAwesomeIcon icon={faArrowUp} />
                <span></span>
                <FontAwesomeIcon icon={faArrowDown} />
            </div>
        </React.Fragment>
        
        
    )
}

export default TimeAdjuster