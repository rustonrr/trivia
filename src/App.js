import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
      this.state = {
        questions: []
      }
  }

  componentWillMount(){
    axios.get('https://practiceapi.devmountain.com/api/trivia/questions/').then(response => {
      this.setState({
        questions: response.data
      })
      console.log(this.state.questions)
    })
  }

  render() {
    let questions = this.state.questions.map( (current, index) => {
      return(
        <div className="results" key={index}>
          <h1>{current.question}</h1>
          <p> Difficulty: {current.difficulty}</p>
          <div className="answers">
            <ul>
            <li>{current.options[1]}</li>
            
            <li>{current.options[2]}</li>
            <li>{current.options[3]}</li>
            <li>{current.options[4]}</li>
          </ul>
            </div>
        </div>
      )
    })
    return (
      <div>
        {questions}
      </div>
    );
  }
}

export default App;
