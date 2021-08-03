// https://ibaslogic.com/react-tutorial-for-beginners/
import React from 'react';
import ReactDOM from 'react-dom';
import ToDoContainer from './functionBased/components/ToDoContainer.js';
import './functionBased/App.css'
// import { BrowserRouter as Router } from "react-router-dom"
import { HashRouter as Router } from "react-router-dom"

ReactDOM.render(
    <Router>
      <ToDoContainer />
    </Router>,
  document.getElementById('root')
)