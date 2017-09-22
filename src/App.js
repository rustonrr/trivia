import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
      this.state = {
        questions: [],
        deleteButtonClicked: false,
        difficulty: ''
      }
      this.hardButton = this.hardButton.bind(this)
      this.easyButton = this.easyButton.bind(this)
      this.medButton = this.medButton.bind(this)
    
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
  hardButton(){
    this.setState({
      difficulty: 3
    })
  }
  medButton(){
    this.setState({
      difficulty: 2
    })
  }
  easyButton(){
    this.setState({
      difficulty: 1
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



    let filteredQs = this.state.questions.filter((e)=>{
      if(e.difficulty === this.state.difficulty ){
        return e
      }else{
        return null
      }
    })

    let mapQuestionsByDiff = filteredQs.map( (current, index) => {
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



let switcher = this.state.difficulty ? mapQuestionsByDiff: questions

    return (
      <div>
        <nav>
          <button onClick={this.hardButton}>Hard</button>
          <button onClick={this.medButton}>Medium</button>

          <button onClick={this.easyButton}>Easy</button>

        </nav>
        {switcher}
      </div>
    );
  }
}

export default App;
