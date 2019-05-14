import React from 'react';
import logo from './logo.svg';
import './App.css';

import PlayPauseButton from './PlayPauseButton/PlayPauseButton.js';
import TimeAdjuster from './TimeAdjuster/TimeAdjuster.js';
import Timer from './Timer/Timer.js';
import ResetButton from './ResetButton/ResetButton.js';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      timeAdjusterWorkTime: 1500,
      timeAdjusterBreakTime: 300,
      timeLeft: 0,
      timerState: 'stopped',
      workTimer: '', 
      iterationCount: 0,
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

  beginCountDown = () => this.timerID = setInterval( () => { this.switchControl(); this.decrementSeconds()  } , 1000 )
  
  decrementSeconds = () => this.setState( (state) => ({ timeLeft: state.timeLeft - 1 }))

  switchControl = () => {
    let timeLeft = this.state.timeLeft; 
    let iterationCount = this.state.iterationCount
    console.log(this.state.timerState)
    
    if( timeLeft === 0 && iterationCount <= 3 ) { 
      
      if( this.state.workTimer === 'session' ) {
          this.setState( (state) => ({  
            workTimer: 'break',  
            timeLeft: state.timeAdjusterBreakTime,
            iterationCount: state.iterationCount + 1,
          }), console.log('break has started'))
      
        } else {
            this.setState( (state) => ({  
              workTimer: 'session',  
              timeLeft: state.timeAdjusterWorkTime,  
            }), console.log('session has started'))
          }   
    
      } else if (iterationCount === 3 ) {
          this.setState({timerState: 'stopped'})
          clearInterval(this.timerID)
    }
  }
  
  resetTimer = () => {
    clearInterval(this.timerID);
    this.setState({
      timeLeft: 0,
      timeAdjusterWorkTime: 1500,
      timeAdjusterBreakTime: 300,
      timerState: 'stopped',
      workTimer: '',
      iterationCount: 0
    });
  }

  workTimeUpArrowClick = () => { 
    this.setState( (state) => ({
      timeAdjusterWorkTime: state.timeAdjusterWorkTime + 60,
    }));
  }
  
  workTimeDownArrowClick = () => {
    if( this.state.timeAdjusterWorkTime >= 60 ){
      this.setState( (state) => ({
        timeAdjusterWorkTime: state.timeAdjusterWorkTime - 60
      }));
    }
  }
   
  restTimeUpArrowClick = () => { 
        this.setState( (state) => ({
          timeAdjusterBreakTime: state.timeAdjusterBreakTime  + 60,
        }));
  }

  restTimeDownArrowClick = () => {   
    if( this.state.timeAdjusterBreakTime >= 60 ){  
      this.setState( (state) => ({
        timeAdjusterBreakTime: state.timeAdjusterBreakTime - 60
      }))
    }   
  }

  render() {
    return ( 
      <div className='pomodoro' >
        <h1 className='title'>Pomodoro Clock</h1>
        <div className='timeAdjusterContainer'>
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
        </div>  
        <Timer 
          workTimer={this.state.workTimer}
          timeLeft={this.state.timeLeft}
          timeAdjusterWorkTime={this.state.timeAdjusterWorkTime}
        />
        <PlayPauseButton 
          countDown={this.timerEngine} 
        /> 
        <ResetButton
          resetTimer={this.resetTimer}
        />
      </div>
    )
  }
}


export default App;

