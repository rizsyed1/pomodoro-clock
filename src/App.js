import React from 'react';
import logo from './logo.svg';
import './App.css';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import PlayPauseButton from './PlayPauseButton/PlayPauseButton.js';
import TimeAdjuster from './TimeAdjuster/TimeAdjuster.js'
import Timer from './Timer/Timer.js'

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      workTime: 25,
      restTime: 5,
      timerWorkTime: 0,
      timerBreakTime: 0

    }
  }

  // workTimeCountDown = () => {
  //   let minutes, seconds; 
  //   let date = new Date();
  //   let currentTime = date.getTime()
  //   let targetTime = currentTime + (this.state.WorkTime * 60000)
    
    
  //   countdown - with every 1000 second interval, (currentTime + workTime) - (new Date()).getTime()
  // }

  workTimeUpArrowClick = () => {
    this.setState({
      workTime: this.state.workTime + 1
    })
  }

  workTimeDownArrowClick = () => {
    this.setState({
      workTime: this.state.workTime - 1
    })
  }

  restTimeUpArrowClick = () => {
    this.setState({
      restTime: this.state.restTime + 1
    })
  }

  restTimeDownArrowClick = () => {
    this.setState({
      restTime: this.state.restTime - 1
    })
  }

  render() {
    return ( 
      <>
        <h1>Pomodoro Clock</h1>
        <TimeAdjuster timeAdjusterName='Break Length' downArrowClick={this.restTimeDownArrowClick} upArrowClick={this.restTimeUpArrowClick} time={this.state.restTime} />
        <TimeAdjuster timeAdjusterName='Session Length' downArrowClick={this.workTimeDownArrowClick} upArrowClick={this.workTimeUpArrowClick} time={this.state.workTime} />
        <Timer workTime={this.state.workTime} restTime={this.state.restTime} />
        <PlayPauseButton play={faPlay} pause={faPause} /> 
      </>
    )
  }
}



export default App;
