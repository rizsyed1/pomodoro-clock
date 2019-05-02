import React from 'react';
import logo from './logo.svg';
import './App.css';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import PlayPauseButton from './PlayPauseButton/PlayPauseButton.js';
import TimeAdjuster from './TimeAdjuster/TimeAdjuster.js';
import Timer from './Timer/Timer.js';

class App extends React.Component {
  constructor (props){
    console.log( 'constructor' )
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

  breakTimeCountDown = () => {
    // first if-condition ensures code block only runs if the break timer has started
    if( this.state.breakTimeMinutes == this.state.timeAdjusterBreakTimeMinutes && this.state.breakTimeMinutes != '00' && this.state.timeAdjusterBreakTimeMinutes != '00' ){ 
      this.triggerBreakTimeCountDown() // sets the workTimer state to false.
      this.decrementBreakTimeMinute() // reduces the breakTimeMinute by one. 
    } else if( this.state.breakTimeSeconds == '00' && this.state.breakTimeMinutes == '00' ){
      this.endCountDown(); // sets the state value countDown to false. 
    } else if( this.state.breakTimeSeconds > '00') {
      this.decrementBreakTimeSeconds() // decrements a second from the break time
    } else if( this.state.breakTimeMinutes > 0 && this.state.breakTimeSeconds == '00' ){
        this.decrementBreakTimeMinute(); // decrements a second from the break time
    }
  } 

  workTimeCountDown = () => { //decrements work time 
    if( this.state.workTimeSeconds > '00' ) {
      this.decrementWorkTimeSeconds();
    } else if( this.state.workTimeMinutes > 0 && this.state.workTimeSeconds == '00' ){
      console.log( 'passed if condition' )
      this.decrementWorkTimeMinute(); .
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
        breakTimeSeconds: '0' + ( state.breakTimeSeconds - 1 ) /
      }))
    } else {
      this.setState( (state) => ({
        breakTimeSeconds: state.breakTimeSeconds - 1 
      }));
    }
  }

  decrementBreakTimeMinute = () => { //increments a second from the break time if minute digit needs to be incremented too.
    if(this.state.breakTimeMinutes <= 10){ // if the breakTimeMinutes in state  is one digit  
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

//workTimeMinutes & timeAdjusterWorkTimeMinutes incremented by one 
  workTimeUpArrowClick = () => { 
    this.setState( (state) => ({
      workTimeMinutes: Number(this.state.workTimeMinutes) + 1,
      timeAdjusterWorkTimeMinutes: this.state.timeAdjusterWorkTimeMinutes  + 1,
    }));
  }

  // workTimeMinutes and timeAdjusterWorkTimeMinutes state props decremented by one 
  workTimeDownArrowClick = () => {
    if(this.state.workTimeMinutes <= 10){
      this.setState( (state) => ({
        workTimeMinutes: '0' + (this.state.workTimeMinutes - 1),
        timeAdjusterWorkTimeMinutes: this.state.timeAdjusterWorkTimeMinutes - 1
      }), console.log(this.state.workTimeMinutes));
    } else {
      this.setState( (state) => ({
        workTimeMinutes: this.state.workTimeMinutes - 1,
        timeAdjusterWorkTimeMinutes: this.state.timeAdjusterWorkTimeMinutes - 1
      }));
    }
  }

  // breakTimeMinutes and timeAdjusterBreakTimeMinutes state props incremented by one 
  restTimeUpArrowClick = () => {
    this.setState({
      breakTimeMinutes: Number(this.state.breakTimeMinutes) + 1,
      timeAdjusterBreakTimeMinutes: this.state.timeAdjusterBreakTimeMinutes  + 1,
    });
  }

  // breakTimeMinutes and timeAdjusterBreakTimeMinutes state props decremented by one 
  restTimeDownArrowClick = () => {
    if(this.state.breakTimeMinutes <= 10) {
      this.setState( (state) => ({
        breakMinutes: '0' + (this.state.breakTimeMinutes - 1),
        timeAdjusterBreakTimeMinutes: this.state.timeAdjusterBreakTimeMinutes - 1
      }))
    } else {
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


// Edge cases to look at: 
// 1) ensuring that if I click on the TimeAdjuster arrows when the Timer is running, the time rendered in the timer does not change. 
//2) Ensuring that if I click on a TimeAdjuster arrow when the timer is counting down less than a minute, the time rendered in timer does not reduce below zero...
// ... and then return a NAN.