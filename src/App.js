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
      countDown:false // if false, no timers are running - break or work.
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.workTimer !== this.state.workTimer || prevState.countDown !== this.state.countDown ){ //checks if workTimer or countDown state props has changed 
      if( this.state.countDown && this.state.workTimer ){
        this.workTimerID = setInterval( () => this.workTimeCountDown(), 1000 ) // invokes the function that starts the countdown timer for work.     
      } else if( this.state.countDown && !this.state.workTimer ) {
          clearInterval(this.workTimerID) //ends setInterval function that runs the work timer.
          this.breakTimerID = setInterval( () => this.breakTimeCountDown(), 1000) // starts the countdown timer for the break.
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

  breakTimeCountDown = () => {
    // first if-condition ensures code block only runs if the break timer has started
    if( this.state.breakTimeMinutes == this.state.timeAdjusterBreakTimeMinutes && this.state.breakTimeMinutes != '00' && this.state.timeAdjusterBreakTimeMinutes != '00' ){ 
      this.triggerBreakTimeCountDown()
      this.decrementBreakTimeMinute() 
    } else if( this.state.breakTimeSeconds == '00' && this.state.breakTimeMinutes == '00' ){
      this.endCountDown(); 
    } else if( this.state.breakTimeSeconds > '00') {
      this.decrementBreakTimeSeconds()
    } else if( this.state.breakTimeMinutes > 0 && this.state.breakTimeSeconds == '00' ){
        this.decrementBreakTimeMinute(); 
    }
  } 

  workTimeCountDown = () => { //decrements work time 
    if( this.state.workTimeSeconds > '00' ) {
      this.decrementWorkTimeSeconds();
    } else if( this.state.workTimeMinutes > 0 && this.state.workTimeSeconds == '00' ){
      console.log( 'passed if condition' )
      this.decrementWorkTimeMinute();
    } else if( this.state.workTimeMinutes == '00' && this.state.workTimeSeconds == '00' ){
      this.triggerBreakTimeCountDown()  
    }
  }

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

  decrementBreakTimeSeconds = () =>{ // reduces the break timer by one second
    if(this.state.breakTimeSeconds <= 10){ // if breakTimeSeconds is one digit
      this.setState( (state) => ({
        breakTimeSeconds: '0' + ( state.breakTimeSeconds - 1 ) 
      }))
    } else {
      this.setState( (state) => ({
        breakTimeSeconds: state.breakTimeSeconds - 1 
      }));
    }
  }

  decrementBreakTimeMinute = () => { //increments a second from the break time if minute digit needs to be incremented too.
    if(this.state.breakTimeMinutes <= 10){
      this.setState( (state) => ({
        breakTimeMinutes: '0' + (state.breakTimeMinutes - 1),   
        breakTimeSeconds: 59
      }));
    } else {
    this.setState( (state) => ({
      breakTimeMinutes: state.breakTimeMinutes - 1, 
      breakTimeSeconds: 59 
    }));
    }
  }
 
  decrementWorkTimeSeconds = () => { // increments a second from the workTimeSeconds state prop.
    if( this.state.workTimeSeconds <= 10 ){
      this.setState( (state) => ({
        workTimeSeconds: '0' + ( state.workTimeSeconds - 1 ) 
      }))
    } else {
      this.setState( (state) => ({
        workTimeSeconds: state.workTimeSeconds - 1
      }));
    }
  };

  decrementWorkTimeMinute = () => { // decrements a minute from the workTimeMinutes state prop
    if(this.state.workTimeMinutes <= 10){ 
      this.setState( (state) => ({
        workTimeMinutes: '0' + ( state.workTimeMinutes - 1 ),
        workTimeSeconds: 59
      }));
    } else {
    this.setState( (state) => ({
      workTimeMinutes: state.workTimeMinutes - 1, 
      workTimeSeconds: 59 
    }));
    }
  };

  endCountDown = () => { // sets countDown state prop to false, ending all timers
    this.setState( (state) => ({
      countDown: false  
    }));
  }


  workTimeUpArrowClick = () => { //workTimeMinutes & timeAdjusterWorkTimeMinutes incremented by one 
    if (!this.state.countDown){
      this.setState( (state) => ({
        workTimeMinutes: Number(this.state.workTimeMinutes) + 1,
        timeAdjusterWorkTimeMinutes: this.state.timeAdjusterWorkTimeMinutes  + 1,
      }));
    }
  }

  
  workTimeDownArrowClick = () => { // workTimeMinutes and timeAdjusterWorkTimeMinutes state props decremented by one 
    console.log(this.workTimeMoreThanZero())
    if(this.state.workTimeMinutes <= 10  && this.workTimeMoreThanZero()){
      this.setState( (state) => ({
        workTimeMinutes: '0' + (this.state.workTimeMinutes - 1),
        timeAdjusterWorkTimeMinutes: this.state.timeAdjusterWorkTimeMinutes - 1
      }));
    } else if (this.workTimeMoreThanZero()) {
      this.setState( (state) => ({
        workTimeMinutes: this.state.workTimeMinutes - 1,
        timeAdjusterWorkTimeMinutes: this.state.timeAdjusterWorkTimeMinutes - 1
      }));
    }
  }

   
  restTimeUpArrowClick = () => { // breakTimeMinutes and timeAdjusterBreakTimeMinutes state props incremented by one
    if (!this.state.countDown){
      this.setState( (state) => ({
        breakTimeMinutes: Number(this.state.breakTimeMinutes) + 1,
        timeAdjusterBreakTimeMinutes: this.state.timeAdjusterBreakTimeMinutes  + 1,
      }));
    }
  }

  
  restTimeDownArrowClick = () => { // breakTimeMinutes and timeAdjusterBreakTimeMinutes state props decremented by one 
    console.log('breakTimeMinute is ' + this.state.breakTimeMinutes)
    console.log('timeAdjusterBreakTimeMinutes is ' + this.state.timeAdjusterBreakTimeMinutes)
    console.log(this.restTimeMoreThanZero())
    if(this.state.breakTimeMinutes <= 10 && this.restTimeMoreThanZero()) {
      this.setState( (state) => ({
        breakTimeMinutes: '0' + (this.state.breakTimeMinutes - 1),  
        timeAdjusterBreakTimeMinutes: this.state.timeAdjusterBreakTimeMinutes - 1
      }))
    } else if (this.restTimeMoreThanZero()) {
      this.setState( (state) => ({
        breakTimeMinutes: this.state.breakTimeMinutes - 1,
        timeAdjusterBreakTimeMinutes: this.state.timeAdjusterBreakTimeMinutes - 1
      }));
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