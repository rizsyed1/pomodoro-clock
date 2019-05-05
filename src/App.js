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
      workTimeMinutes: 25,
      workTimeSeconds: '00',
      breakTimeMinutes: '05',
      breakTimeSeconds: '00',
      timeAdjusterWorkTimeMinutes: 25,
      timeAdjusterBreakTimeMinutes: 5,
      workTimer: true, //true when timer is measuring working time, false if timer is measuring break
      countDown:false, // if false, no timers are running - break or work.
      iterationCount: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.workTimer !== this.state.workTimer || prevState.countDown !== this.state.countDown ){ //checks if workTimer or countDown state props has changed 
      if( this.state.countDown && this.state.workTimer ){
        this.workTimerID = setInterval( () => this.timeCountDown(), 1000 ) // invokes the function that starts the countdown timer for work.     
      } else if( this.state.countDown && !this.state.workTimer ) {
          clearInterval(this.workTimerID) //ends setInterval function that runs the work timer.
          this.breakTimerID = setInterval( () => this.timeCountDown(), 1000) // starts the countdown timer for the break.
      } else if( this.state.breakTimeMinutes == '00' && this.state.breakTimeSeconds == '00' && this.breakTimerID ) { // checks if the breakTime is over
          clearInterval( this.breakTimerID ) // ends the setInterval function that runs the break timer 
      }
    }
  }

  workTimeMoreThanZero = () => { // checks state.workTime won't go below zero & state.countDown is false
  if (this.state.workTimeMinutes >= 1 && !this.state.countDown ){
    return true;
  } else {
      return false;
  }
}

  restTimeMoreThanZero = () => { // checks state.breakTime won't go below zero and state.countDown is false
    if (this.state.breakTimeMinutes >= 1 && !this.state.countDown ){
      return true;
    } else {
      return false;
    }
  }

  breakTimerHasStarted = () => { // returns true if the break timer has started
    if(this.state.breakTimeMinutes == this.state.timeAdjusterBreakTimeMinutes && this.state.breakTimeMinutes > 0 && this.state.timeAdjusterBreakTimeMinutes > 0){
      this.setState( (state) => ({
        iterationCount: state.iterationCount + 1
      }));
      return true   
    } else {
        return false 
    }
  }

  timeCountDown = () => {
    if(this.state.workTimer === false ) {
      if( this.breakTimerHasStarted() ){ 
          this.triggerBreakTimeCountDown()
          this.decrementMinutes()
      } else if( this.state.breakTimeSeconds == 0 && this.state.breakTimeMinutes == 0 && this.state.iterationCount === 3){// timer stops after 3 worktimer and breaktimer iterations
          this.endCountDown(); 
      } else if( this.state.breakTimeSeconds > 0) {
          this.decrementSeconds()
      } else if( this.state.breakTimeMinutes > 0 && this.state.breakTimeSeconds == 0 ){ 
          this.decrementMinutes(); 
      } else if ( this.state.breakTimeSeconds == 0 && this.state.breakTimeMinutes == 0){ // ends breakTimer and starts workTimer
          this.triggerWorkTimeCountDown()
          this.decrementMinutes()
      }
    } else if (this.state.workTimer === true) {
        if( this.state.workTimeSeconds > 0 ) {
          this.decrementSeconds();
        } else if( this.state.workTimeMinutes > 0 && this.state.workTimeSeconds == 0 ){
            this.decrementMinutes();
        } else if( this.state.workTimeMinutes == 0 && this.state.workTimeSeconds == 0 ){ // Triggers break timer after work timer has ended 
            this.triggerBreakTimeCountDown()  
        }
    }
  } 

  triggerWorkTimeCountDown = () => { // sets the workTimer prop to false 
    this.setState( (state) => ({
      workTimer: true
    }))
  };

  triggerBreakTimeCountDown = () => { // sets the workTimer prop to false 
    this.setState( (state) => ({
      workTimer: false 
    }))
  };

  triggerTimeCountDown = () => { // sets countDown state prop as true & so starts worktimer
    this.setState( (state) => ({
      countDown: true
    }))
  };

  decrementSeconds = () => { // decrements a second from either work or break timer. 
    if (this.state.workTimer === false) { // reduces the break timer by one second
      this.setState( (state) => ({
        breakTimeSeconds: state.breakTimeSeconds - 1 
      }));
    } else if (this.state.workTimer === true){ // increments a second from the workTimeSeconds state prop.
        this.setState( (state) => ({
          workTimeSeconds: state.workTimeSeconds - 1
        }));
    } 
  }

  decrementMinutes = () => { //increments a second from the break time if minute digit needs to be incremented too.
    if(this.state.workTimer === true) {
        this.setState( (state) => ({
          workTimeMinutes: state.workTimeMinutes - 1 ,
          workTimeSeconds: 59
        }));
    } else if (this.state.workTimer === false) {
          this.setState( (state) => ({
            breakTimeMinutes: state.breakTimeMinutes - 1,   
            breakTimeSeconds: 59
          }));

      }
  }

  endCountDown = () => { // sets countDown state prop to false, ending all timers
    this.setState( (state) => ({
      countDown: false  
    }));
  }


  workTimeUpArrowClick = () => { //workTimeMinutes & timeAdjusterWorkTimeMinutes incremented by one 
    if (this.state.countDown === false ){
        this.setState( (state) => ({
          workTimeMinutes: state.workTimeMinutes + 1,
          timeAdjusterWorkTimeMinutes: state.timeAdjusterWorkTimeMinutes  + 1,
        }));
    }
  }

  
  workTimeDownArrowClick = () => { // workTimeMinutes and timeAdjusterWorkTimeMinutes state props decremented by one 
    if(this.workTimeMoreThanZero()){
      this.setState( (state) => ({
        workTimeMinutes: state.workTimeMinutes - 1,
        timeAdjusterWorkTimeMinutes: state.timeAdjusterWorkTimeMinutes - 1
      }));
    }
  }

   
  restTimeUpArrowClick = () => { // breakTimeMinutes and timeAdjusterBreakTimeMinutes state props incremented by one
    if (this.state.countDown === false ){
        this.setState( (state) => ({
          breakTimeMinutes: state.breakTimeMinutes + 1,
          timeAdjusterBreakTimeMinutes: state.timeAdjusterBreakTimeMinutes  + 1,
        }));
    }
  }

  
  restTimeDownArrowClick = () => { // breakTimeMinutes and timeAdjusterBreakTimeMinutes state props decremented by one  
      this.setState( (state) => ({
        breakTimeMinutes: state.breakTimeMinutes - 1,  
        timeAdjusterBreakTimeMinutes: state.timeAdjusterBreakTimeMinutes - 1
      }))

  }

  render() {
    return ( 
      <>
        <h1>Pomodoro Clock</h1>
        <TimeAdjuster 
          timeAdjusterName='Break Length' 
          downArrowClick={this.restTimeDownArrowClick} 
          upArrowClick={this.restTimeUpArrowClick} 
          time={this.state.timeAdjusterBreakTimeMinutes} 
        />
        <TimeAdjuster 
          timeAdjusterName='Session Length' 
          downArrowClick={this.workTimeDownArrowClick} 
          upArrowClick={this.workTimeUpArrowClick} 
          time={this.state.timeAdjusterWorkTimeMinutes} 
        />
        <Timer workTimer={this.state.workTimer} 
          workMinutes={this.state.workTimeMinutes} 
          workSeconds={this.state.workTimeSeconds} 
          breakSeconds={this.state.breakTimeSeconds} 
          breakMinutes={this.state.breakTimeMinutes} 
        />
        <PlayPauseButton 
          countDown={this.triggerTimeCountDown} 
          play={faPlay} 
          pause={faPause} 
        /> 
      </>
    )
  }
}


export default App;


 
// write a function that can pause and restart the timer