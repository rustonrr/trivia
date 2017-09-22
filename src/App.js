import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
      this.state = {
        questions: [],
        deleteButtonClicked: false
      }
      this.deleteButton = this.deleteButton.bind(this);
      this.secondDeleteButton = this.secondDeleteButton.bind(this);
  }

  componentWillMount(){
    axios.get('https://practiceapi.devmountain.com/api/trivia/questions/').then(response => {
      this.setState({
        questions: response.data
      })
      console.log(this.state.questions)
    })
  }

  deleteButton(){
    console.log('first button clicked');
    this.setState({
      deleteButtonClicked: true
    })
  }

  secondDeleteButton(questionid){
    console.log('deleted');
    this.setState({
      deleteButtonClicked: false
    })

    let newQuestions = this.state.questions;
    for(let i = 0; i < newQuestions.length; i++) {
        if(newQuestions[i]._id === questionid) {
            newQuestions.splice(i, 1)
        }
    }
    axios.delete(`https://practiceapi.devmountain.com/api/trivia/questions/${questionid}`)
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
            <button onClick={() => {this.deleteButton()}}>Delete</button>
            <button hidden={!this.state.deleteButtonClicked} onClick={ () => {this.secondDeleteButton(current._id)} }>Are you sure?</button>
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
