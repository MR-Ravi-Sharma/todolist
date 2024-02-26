// Learn From Tutorial [6 pack programmer]

import './App.css';
import { useState, useEffect } from 'react';

const Task = ({ title, description, deleteTask, index }) => {

  return (
    <div className='task'>
      <div>
        <p>{title}</p>
        <span>{description}</span>
      </div>
      <button onClick={() => deleteTask(index)} >-</button>
    </div>
  )
}

function App() {
  const initialArr = localStorage.getItem("task")? JSON.parse(localStorage.getItem("task")):[];

  const [task, setTask] = useState(initialArr)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  console.log(title, description)

  const submitHandler = (e) => {
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
    <div className='container'>
      <h1>DAILY GOALS</h1>
      <form onSubmit={submitHandler} >
        <input 
        type='text' 
        placeholder='Title' 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type='submit'>ADD</button>
      </form>
      {task.map((value, index) => <Task key={index} title={value.title} description={value.description} deleteTask={deleteTask} index={index} />)}
    </div>
  );
}

export default App;
