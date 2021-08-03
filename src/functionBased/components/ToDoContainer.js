import React, { useState, useEffect } from 'react'
import ToDosList from './ToDosList'
import Header from './Header'
import InputToDo from './InputToDo'
import {v4 as uuidv4} from 'uuid'
import { Route, Switch } from 'react-router-dom'
import About from './pages/About'
import NotMatch from './pages/NotMatch'
import Navbar from './Navbar'

const ToDoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos())
  
  const handleChange = id => {
    setTodos(prevState =>
      prevState.map( todo => {
        if(todo.id === id){
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    )
  };
  const delTodo = id => {
    setTodos([
      ...todos.filter(todo => {
        return todo.id !== id
      }),
    ])
  };
  const addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    }
    setTodos([...todos, newTodo])
  };
  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      })
    )
  }

  // useEffect(() => {
  //   console.log("testicle")
  //   // get stored items
  //   const temp = localStorage.getItem("todos")
  //   const loadedTodos = JSON.parse(temp)
  //   if (loadedTodos){
  //     setTodos(loadedTodos)
  //   }
  // }, [setTodos])

  function getInitialTodos(){
    const temp = localStorage.getItem("todos")
    const savedTodos = JSON.parse(temp)
    return savedTodos || []
  }

  useEffect(() => {
    // storing todo items
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos",temp)
  }, [todos])

// We will need the url to build nested links; the path for nested routes while the params needed for dynamic routes.

  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <div className="container">
            <div className="inner">
              <Header />
              <InputToDo
                addTodoProps={addTodoItem}
              />
              <ul>
                <ToDosList
                  todos={todos}
                  handleChangeProps={handleChange}
                  deleteTodoProps={delTodo}
                  setUpdate={setUpdate}
                >
                </ToDosList>
              </ul>
            </div>
          </div>
        </Route>
        {/*<Route path="/about" component={About} />        */}
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotMatch />
        </Route>
      </Switch>
    </>
  )
}

export default ToDoContainer