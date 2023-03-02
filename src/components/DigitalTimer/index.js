// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    setTime: 25,
    minutes: 25,
    seconds: 0,
    isTimerStarted: false,
    count: 0,
  }

  timerStart = () => {
    this.setState(prev => ({
      isTimerStarted: !prev.isTimerStarted,
      count: prev.count + 1,
    }))
    this.timerId = setInterval(this.tick, 1000)
  }

  timerStop = () => {
    clearInterval(this.timerId)
    this.setState(prev => ({
      isTimerStarted: !prev.isTimerStarted,
      count: prev.count + 1,
    }))
  }

  onIncrement = () => {
    const {count, setTime} = this.state
    if (count === 0 && setTime > 1) {
      this.setState(prev => ({
        setTime: prev.setTime + 1,
        minutes: prev.setTime + 1,
      }))
    }
  }

  onDecrement = () => {
    const {count, setTime} = this.state
    if (count === 0 && setTime > 1) {
      this.setState(prev => ({
        setTime: prev.setTime - 1,
        minutes: prev.setTime - 1,
      }))
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      setTime: 25,
      minutes: 25,
      seconds: 0,
      isTimerStarted: false,
      count: 0,
    })
  }

  tick = () => {
    const {minutes, seconds} = this.state
    if (minutes === 0 && seconds === 0) {
      clearInterval(this.timerId)
      this.setState({
        setTime: 25,
        minutes: 25,
        seconds: 0,
        isTimerStarted: false,
        count: 0,
      })
    } else if (seconds === 0) {
      this.setState(prev => ({minutes: prev.minutes - 1, seconds: 59}))
    } else {
      this.setState(prev => ({seconds: prev.seconds - 1}))
    }
  }

  render() {
    const {setTime, minutes, seconds, isTimerStarted} = this.state
    const zero = seconds < 10 ? '0' : ''
    const stateButtonImage = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altImage = isTimerStarted ? 'pause icon' : 'play icon'
    const stateText = isTimerStarted ? 'Pause' : 'Start'
    const clicked = isTimerStarted ? this.timerStop : this.timerStart
    const status = isTimerStarted ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="timer">
            <div className="time-container">
              <h1>
                {minutes}:{zero}
                {seconds}
              </h1>
              <p>{status}</p>
            </div>
          </div>
          <div>
            <div className="state-control">
              <div className="button-container">
                <button
                  type="button"
                  className="button-control"
                  onClick={clicked}
                >
                  <img
                    src={stateButtonImage}
                    alt={altImage}
                    className="image-icon"
                  />
                  {stateText}
                </button>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="button-control"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="image-icon"
                  />
                </button>
                <p>Reset</p>
              </div>
            </div>
            <p>set timer limit</p>
            <div className="set-timer">
              <button
                className="button-control"
                type="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="time">{setTime}</p>
              <button
                onClick={this.onIncrement}
                className="button-control"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
