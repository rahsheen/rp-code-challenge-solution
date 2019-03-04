/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import './App.css'

const GIT_USER = ''
const GIT_USER_URL = `https://api.github.com/users/${GIT_USER}/events`
const SCORE_INFO = {
  'PushEvent': 5,
  'PullRequestReviewCommentEvent': 4,
  'WatchEvent': 3,
  'CreateEvent': 2,
}

export default class App extends Component {
  state = {
    score: null,
    multiplier: null
  }

  calculateScore = data => data.reduce((total, {type}) => total + (SCORE_INFO[type] || 1),0)
  multiplyScore = score => {
    return this.state.multiplier === null ? score : this.state.multiplier * score;
  }

  getData = () => {
    console.log("Clicked")
    const total = 0;
    fetch('https://api.github.com/users/dhh/events')
    .then(response => response.json())
    .then(data => this.setState({score: this.multiplyScore(this.calculateScore(data))}))
    .catch(e => console.log)
  }

  onTextChange = e => {
    this.setState({multiplier: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className="App_score">
          {this.state.score == null ? 'n/a' : this.state.score}
        </div>
        <input type="number" onChange={this.onTextChange} />
        <button
          type="button"
          className="App_button"
          children="Get Score"
          onClick={this.getData}
        />
      </div>
    );
  }
}
