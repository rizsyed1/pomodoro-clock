import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './PlayPauseButton.css'


let PlayPauseButton = ({countDown}) =>  {
    return (
        <button onClick={countDown} className='playPauseButton'><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>  
    )
}

export default PlayPauseButton 