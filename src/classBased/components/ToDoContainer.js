import React from 'react';
import ToDosList from './ToDosList';
import Header from './Header';
import InputToDo from './InputToDo';
import {v4 as uuidv4} from 'uuid';

class ToDoContainer extends React.Component {
  state = {
   todos: []
  };
  handleChange = (id) => {
    console.log("clicked",id)
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id == id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    }));
  };
  delTodo = id => {
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => {
          return todo.id !== id;
        })
      ]
    });
  };
  addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    }
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
    console.log(newTodo)
  };
  setUpdate = (updatedTitle, id) => {
    console.log(updatedTitle, id)
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      })
    })
  }
  // componentDidMount(){
  //   fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
  //   .then(response => response.json())
  //   .then(data => this.setState({todos: data }))
  // }
  componentDidMount(){
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }
  render() {
    return (
      <div className="container" id="top">
        <div className="inner">
          <Header />
          <InputToDo
            addTodoProps={this.addTodoItem}
          />
          <ul>
            <ToDosList
              todos={this.state.todos}
              handleChangeProps={this.handleChange}
              deleteTodoProps={this.delTodo}
              setUpdate={this.setUpdate}
            >
            </ToDosList>
          </ul>
        </div>
      </div>
    )
  }
}

export default ToDoContainer