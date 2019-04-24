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

  upArrowClick = () => {

  }

  downArrowClick = () => {
    this.setState({
      workTime: this.state.workTime - 1
    })
  }

  render() {
    return (
      <>
        <h1>Pomodoro Clock</h1>
        <TimeAdjuster timeAdjusterName='Break Length' downArrowClick={this.downArrowClick} upArrowClick={this.upArrowClick} time={this.state.workTime} />
        <TimeAdjuster timeAdjusterName='Session Length' downArrowClick={this.downArrowClick} upArrowClick={this.downArrowClick} time={this.state.restTime} />
        <Timer />
      </>
    )
  }
}



export default App;
