import React, { useState, useEffect} from 'react';
import styles from './TodoItem.module.css'
import { FaTrash } from "react-icons/fa"

const ToDoItem = props =>{

  const [editing, setEditing] = useState(false)

  const handleEditing = () => {
    setEditing(true)
  }

  const handleUpdatedDone = event => {
    if (event.key === "Enter") {
      // this.setState({editing: false})
      setEditing(false)
    }
  }

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  }

  const {completed, id, title} = props.todo

  let viewMode = {}
  let editMode = {}

  if (editing) {
    viewMode.display = "none"
  } else {
    editMode.display = "none"
  }

  // useEffect(() => {
  //   console.log("cleaning up")
  // })

  useEffect(() => {
    return () => {
      console.log("cleaning up")
    }
  }, [])

  return(
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input 
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
        />
        <button
          onClick={() => props.deleteTodoProps(id)}
        >
          <FaTrash
            style={{ color: "orangered", fontSize: "20px" }}
          />
        </button>
        <span style={completed ? completedStyle : null}>
          {title}
        </span>
      </div>
      <input 
        type="text" 
        className="{styles.textInput}" 
        style={editMode}
        value={title}
        onChange={e => {
          props.setUpdate(e.target.value, id)
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  )
}

export default ToDoItem