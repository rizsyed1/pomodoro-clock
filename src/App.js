import React from 'react';
import logo from './logo.svg';
import './App.css';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import PlayPauseButton from './PlayPauseButton/PlayPauseButton.js';
import TimeAdjuster from './TimeAdjuster/TimeAdjuster.js';
import Timer from './Timer/Timer.js';

class App extends React.Component {
  constructor (props){
    console.log('constructor')
    super(props);
    this.state = {
      workTimeMinutes: 25,
      workTimeSeconds: 0,
      breakTimeMinutes: 5,
      breakTimeSeconds: 0,
      timeAdjusterWorkTimeMinutes: 25,
      timeAdjusterBreakTimeMinutes: 5,
      workTimer: true,
      countDown:false
    }
  }
  componentDidMount(){
    console.log('component Did Mount')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')
    if(prevState.countDown !== this.state.countDown){
      if(this.state.countDown === true){
        this.timerID = setInterval( () => this.timeCountDown(), 1000 )
      } 
    } else if(this.state.workTimeMinutes === 0 && this.state.workTimeSeconds === 0) {
        clearInterval(this.timerID)
    }
  }
  

  triggerTimeCountDown = () => {
    console.log('triggerTimeCountDown')
    this.setState( (state) => ({
      countDown: true
    }), console.log(this.state.countDown))
  }

  decrementWorkTimeSeconds = () => {
    this.setState( (state) => ({
      workTimeSeconds: state.workTimeSeconds - 1
    }))
  };

  decrementWorkTimeMinute = () => {
    this.setState( (state) => ({
      workTimeMinutes: state.workTimeMinutes - 1,
      workTimeSeconds: 59
    }))
  };

  endCountDown = () => {
    this.setState( (state) => ({
      countDown: false 
    }))
  }

  timeCountDown = () => {
    if(this.state.workTimeSeconds === 0 && this.state.workTimeMinutes === 0){
      this.endCountDown()
    } else if(this.state.workTimeSeconds > 0) {
      this.decrementWorkTimeSeconds() 
    } else if(this.state.workTimeMinutes > 0 && this.state.workTimeSeconds === 0 ){
      console.log('passed if condition')
      this.decrementWorkTimeMinute()
    }    
  }


  workTimeUpArrowClick = () => {
    this.setState({
      workTimeMinutes: this.state.workTimeMinutes + 1,
      timeAdjusterWorkTimeMinutes: this.state.timeAdjusterWorkTimeMinutes  + 1,
    })
  }

  workTimeDownArrowClick = () => {
    this.setState({
      workTimeMinutes: this.state.workTimeMinutes - 1,
      timeAdjusterWorkTimeMinutes: this.state.timeAdjusterWorkTimeMinutes - 1
    })
  }

  restTimeUpArrowClick = () => {
    this.setState({
      breakTimeMinutes: this.state.breakTimeMinutes + 1
    })
  }

  restTimeDownArrowClick = () => {
    this.setState({
      breakTimeMinutes: this.state.breakTimeMinutes - 1
    })
  }

  render() {
    return ( 
      <>
        <h1>Pomodoro Clock{this.state.countDown}</h1>
        <TimeAdjuster timeAdjusterName='Break Length' downArrowClick={this.restTimeDownArrowClick} upArrowClick={this.restTimeUpArrowClick} time={this.state.timeAdjusterBreakTimeMinutes} />
        <TimeAdjuster timeAdjusterName='Session Length' downArrowClick={this.workTimeDownArrowClick} upArrowClick={this.workTimeUpArrowClick} time={this.state.timeAdjusterWorkTimeMinutes} />
        <Timer minutes={this.state.workTimeMinutes} seconds={this.state.workTimeSeconds} />
        <PlayPauseButton countDown={this.triggerTimeCountDown} play={faPlay} pause={faPause} /> 
      </>
    )
  }
}



export default App;
