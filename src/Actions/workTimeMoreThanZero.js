 let workTimeMoreThanZero = () => { // checks state.workTime won't go below zero & state.countDown is false
  if (this.state.workTimeMinutes >= 1 && !this.state.countDown ){
    return true;
  } else {
    return false;
  }
}

export default workTimeMoreThanZero