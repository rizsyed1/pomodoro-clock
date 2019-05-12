import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const ResetButton = ({ resetTimer }) => {
    return(
        <button type='button' onClick={ resetTimer } ><FontAwesomeIcon icon={ faSync } /></button>
    )
}

export default ResetButton