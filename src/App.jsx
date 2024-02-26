import { useState } from 'react'
import './App.css';


function App() {
  const [taskName, setTaskName] = useState('');
  const [listName, setListName] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);



  const handelChange = (e)=>{
    setTaskName(e.target.value);
  }

  const handelSubmit = (e)=>{
    e.preventDefault();
    
    if (editing) {
      // If editing, update the existing task at the editIndex
      const newList = [...listName];
      newList[editIndex] = taskName;
      setListName(newList);
      setEditing(false);
      setEditIndex(null);
    } else {
      // If not editing, add a new task
      setListName(prevList => [...prevList, taskName]);
    }

    // Reset taskName
    setTaskName('');

  }
  const handleDelete = (index) => {
    const deletedItem = listName[index];

    let newArr = [...listName];
    newArr.splice(index, 1);
    setListName(newArr);
    setEditing(false); // Reset editing state when deleting
    setEditIndex(null);


  }
  const handleEdit = (index) => {
    setEditing(true);
    setEditIndex(index);
    setTaskName(listName[index]); // Populate input with the current task for editing
  }

  return (
    <>
    <h1>TODO LIST</h1>
    <input placeholder='Write someting' onChange={handelChange} value={taskName}></input>
    <button className='Add'  onClick={handelSubmit}>{editing ? 'Update Task' : 'Add Task'}</button>
      <ul>{listName.map((item, index)=>{
          return <li key={index}>{item} <button className='Delete' onClick={()=>handleDelete(index)}> Delete</button>
            <button className='edit' onClick={()=>handleEdit(index)}>Edit</button>
          </li>
        })}
      </ul>
    </>
  )
}

export default App
