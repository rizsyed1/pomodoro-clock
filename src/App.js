import React from 'react';
import logo from './logo.svg';
import './App.css';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import PlayPauseButton from './PlayPauseButton/PlayPauseButton.js';
import TimeAdjuster from './TimeAdjuster/TimeAdjuster.js';
import Timer from './Timer/Timer.js';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      timeAdjusterWorkTime: 1500,
      timeAdjusterBreakTime: 300,
      timeLeft: 0,
      timerState: 'stopped',
      workTimer: '', // session is for work, break is for break 
      iterationCount: -1,
      pause: false
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.iterationCount !== this.state.iterationCount){
      console.log(`iterationCount is now ${this.state.iterationCount}`)
    }
  }
  
  timerEngine = () => {
    if ( this.state.timerState === 'stopped' ) {
      this.beginCountDown() 
      this.setState({timerState: 'running'})
    } else {
        this.setState({ timerState: 'stopped'})
        clearInterval(this.timerID)
    }
  }

  beginCountDown = () => setInterval( () => { this.switchControl(); this.decrementSeconds()  } , 1000 )
  
  decrementSeconds = () => this.setState( (state) => ({timeLeft: state.timeLeft - 1 }))

  switchControl = () => {
    let timeLeft = this.state.timeLeft; 
    let iterationCount = this.state.iterationCount
    if( timeLeft === 0 && iterationCount < 4 ) { //replace this with timeLeft < 0 if it gets glitch - let's see what happens
      if( this.state.workTimer === 'session' ) {
        this.setState( (state) => ({  
          workTimer: 'break',  
          timeLeft: state.timeAdjusterBreakTime,
        }), console.log('break has started'))
      } else {
          this.setState( (state) => ({  
            workTimer: 'session',  
            timeLeft: state.timeAdjusterWorkTime,
            iterationCount: state.iterationCount + 1,  
          }), console.log('session has started'))
        }   
    } else {
      this.setState({timerState: 'stopped'})
    }
  }
  


  workTimeUpArrowClick = () => { //workTimeMinutes & timeAdjusterWorkTimeMinutes incremented by one 
    this.setState( (state) => ({
      timeAdjusterWorkTime: state.timeAdjusterWorkTime + 60,
    }));
  }
  
  workTimeDownArrowClick = () => { // workTimeMinutes and timeAdjusterWorkTimeMinutes state props decremented by one 
    if( this.state.timeAdjusterWorkTime >= 60 ){
      this.setState( (state) => ({
        timeAdjusterWorkTime: state.timeAdjusterWorkTime - 60
      }));
    }
  }
   
  restTimeUpArrowClick = () => { // breakTimeMinutes and timeAdjusterBreakTimeMinutes state props incremented by one
        this.setState( (state) => ({
          timeAdjusterBreakTime: state.timeAdjusterBreakTime  + 60,
        }));
  }

  restTimeDownArrowClick = () => { // breakTimeMinutes and timeAdjusterBreakTimeMinutes state props decremented by one  
    if( this.state.timeAdjusterBreakTime >= 60 ){  
      this.setState( (state) => ({
        timeAdjusterBreakTime: state.timeAdjusterBreakTime - 60
      }))
    }   
  }

  render() {
    return ( 
      <>
        <h1>Pomodoro Clock</h1>
        <TimeAdjuster 
          timeAdjusterName='Break Length' 
          downArrowClick={this.restTimeDownArrowClick} 
          upArrowClick={this.restTimeUpArrowClick} 
          time={this.state.timeAdjusterBreakTime} 
        />
        <TimeAdjuster 
          timeAdjusterName='Session Length' 
          downArrowClick={this.workTimeDownArrowClick} 
          upArrowClick={this.workTimeUpArrowClick} 
          time={this.state.timeAdjusterWorkTime} 
        />
        <Timer 
          timeLeft={this.state.timeLeft}
        />
        <PlayPauseButton 
          countDown={this.timerEngine} 
          play={faPlay} 
          pause={faPause} 
        /> 
      </>
    )
  }
}


export default App;


 
// write a function that can pause and restart the timer