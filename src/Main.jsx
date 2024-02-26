// Experimenting with Code by self

import React from "react";
import { useState, useEffect } from "react";
import "./main.css";


const Task = ({ title, description, deleteTask, index }) => {
    return (
      <div className='task'>
            <p>
              <span>{title}</span>&nbsp;:&nbsp; 
              {description}
            </p>
        <button className="delete" onClick={() => deleteTask(index)} >-</button>
      </div>
    )
  }

const Main = () => {
    const [visible, setVisible] = useState({display: 'flex'})
    const closeWriting = () => {
        if(visible.display === 'none'){
            setVisible({display: 'flex'})
        } else {
            setVisible({display: 'none'})
        }
    }

    const initialArr = localStorage.getItem("task")? JSON.parse(localStorage.getItem("task")):[];

    const [task, setTask] = useState(initialArr)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
  
    console.log(title, description)
  
    const submitHandler = (e) => {
            console.log('hello')
            e.preventDefault();
            setTask([...task, { title, description } ])
            setTitle("")
            setDescription("")
    }
  
    const deleteTask = (index) => {
      const filteredArr = task.filter((val, i) => {
        return i !== index;
      })
      setTask(filteredArr)
    }
  
    useEffect(() => {
      localStorage.setItem("task", JSON.stringify(task));
    }, [task]);

  return (
    <div className="container">
      <div>
        <h1 className="app-title" onClick={closeWriting}>DAILY GOALS ✍🏻</h1>
      </div>

      <div className="container2">
        <div className="container3" style={visible}>
          <hr />
          <hr />
          <form onSubmit={submitHandler}>
            <input 
            type="text" 
            placeholder="My goal is ..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
            placeholder="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">ADD</button>
          </form>
          <hr />
          <hr />
        </div>
        <div className="all-tasks">
        {task.map((value, index) => <Task key={index} title={value.title} description={value.description} deleteTask={deleteTask} index={index} />)}
        </div>
        
      </div>
    </div>
  );
};

export default Main;
