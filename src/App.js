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
      workTimer: true, //true when timer is measuring working time, false if timer is measuring break
      iterationCount: 0,
      pause: false
    }
  }


  
  timerEngine = () => {
    while(this.state.iterationCount <= 3) {

      this.setState( (state) => ({ timeLeft: state.timeAdjusterWorkTime }));

      while(this.state.timeLeft > 0){
        this.timerID = setInterval( this.decrementSeconds , 1000 )
      }

      clearInterval(this.timerID)

      this.setState( (state) => ({ timeLeft: state.timeAdjusterBreakTime }));

      while(this.state.timeLeft > 0){
        this.timerID = setInterval( this.decrementSeconds , 1000 )
      }

      clearInterval(this.timerID)

      this.setState( (state) => ({ iterationCount: state.iterationCount + 1 }) )
    }
  }

  decrementSeconds = () => { // decrements a second from either work or break timer.
    this.setState( (state) => ({timeLeft: state.timeLeft -1}))
  }

  workTimeUpArrowClick = () => { //workTimeMinutes & timeAdjusterWorkTimeMinutes incremented by one 
        this.setState( (state) => ({
          timeAdjusterWorkTime: state.timeAdjusterWorkTime + 60,
        }));
  }
  
  workTimeDownArrowClick = () => { // workTimeMinutes and timeAdjusterWorkTimeMinutes state props decremented by one 
    if( this.state.workTime >= 60 ){
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
    if( this.state.breakTime >= 60 ){  
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