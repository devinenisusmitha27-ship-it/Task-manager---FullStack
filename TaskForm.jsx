import React, {useState} from 'react'
import API from '../api'

export default function TaskForm(){
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const submit = async (e)=>{
    e.preventDefault()
    if(!title) return
    await API.post('/tasks',{title,description,done:false})
    setTitle('')
    setDescription('')
    // naive: reload window to refresh list; better: use context or event emitter
    window.location.reload()
  }
  return (
    <form onSubmit={submit} style={{marginBottom:20}}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />{' '}
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />{' '}
      <button type="submit">Add</button>
    </form>
  )
}
