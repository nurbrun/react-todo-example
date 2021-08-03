// As long as the value of the name attribute in the input tag matches what you have in the state. It will work perfectly.

// In our app, the parent component, TodoContainer is the one that holds the state data. This component, therefore, is the ONLY one that can change it. 

// In React, we do not modify the state directly. Instead, we update through a method we inherited by extending React.Component. This method is called setState().

import React, { Component } from 'react';
class InputToDo extends Component {
  state = {
    title: "",
    // friend: ""
  };
  onChange = e => {
    console.log(e.target.name,e.target.value)
    // console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title.trim()) {
      console.log(this.state);
      this.props.addTodoProps(this.state.title);
      this.setState({
        title: ""
      });  
    } else {
      alert("Please write something")
    }
      

  };
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text"
          className="input-text"
          placeholder="imaburd" 
          value={this.state.title} 
          onChange={this.onChange} 
          name="title" 
        />
        {/*<input 
          type="text" 
          placeholder="imaburd" 
          value={this.state.friend} 
          onChange={this.onChange} 
          name="friend" 
        />*/}
        <button>Submit</button>
      </form>
    )
  }
}
export default InputToDo
