import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './ResetButton.css';

const ResetButton = ({ resetTimer }) => {
    return(
        <button className='resetButton' type='button' onClick={ resetTimer } ><FontAwesomeIcon icon={ faSync } /></button>
    )
}

export default ResetButton