import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimeAdjuster from './TimeAdjuster/TimeAdjuster.js'
import Timer from './Timer/Timer.js'

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      workTime: 25,
      restTime: 5

    }
  }

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
        <Timer />
      </>
    )
  }
}



export default App;
