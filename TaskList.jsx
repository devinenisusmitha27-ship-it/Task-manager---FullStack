import React, {useEffect, useState} from 'react'
import API from '../api'

export default function TaskList(){
  const [tasks, setTasks] = useState([])
  useEffect(()=>{ fetchTasks() },[])
  const fetchTasks = async ()=>{
    const res = await API.get('/tasks')
    setTasks(res.data)
  }
  const toggleDone = async (t)=>{
    await API.put(`/tasks/${t.id}`, {...t, done: !t.done})
    fetchTasks()
  }
  const del = async (id)=>{ await API.delete(`/tasks/${id}`); fetchTasks() }
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(t=> (
          <li key={t.id} style={{marginBottom:8}}>
            <input type="checkbox" checked={t.done} onChange={()=>toggleDone(t)}/> {' '}
            <strong>{t.title}</strong> - {t.description} {' '}
            <button onClick={()=>del(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
