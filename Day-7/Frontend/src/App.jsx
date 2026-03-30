import { useState , useEffect } from 'react'
import axios from 'axios'


function App() {
const [notes, setNotes] = useState([
  {
  title:"Title Number 1",
  description:"Description 1"
  },
  {
  title:"Title Number 2",
  description:"Description 2"
  },
  {
  title:"Title Number 3",
  description:"Description 3"
  },
  {
  title:"Title Number 4",
  description:"Description 4"
  }
])

function fetchNotes(){
  axios.get("http://localhost:3000/api/notes")  
      .then((res)=>{
      // console.log(res.data.notes)
      setNotes(res.data.notes)
      })
}

//UseEffect humne isiliye use kiya hai kyuki koi specifi task bus 1 baar render karna hai 
// For eg. Humein DATA bus ek baar hi render karna hai isiliye woh code useEffect ke andar likha hai.

useEffect(() => {
      fetchNotes()
    }, [])

function handleSubmit(e){
  e.preventDefault()
  const {title,description} = e.target.elements
  console.log(title.value,description.value)
  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description.value
  })                                             // (res.body) mein data bhejna hota hai isiliye object format mein bhejte hai url ke badmein
  .then(res=>{
    console.log(res.data)
    fetchNotes() // Isiliye call kiya hai ki jab koi new note bane to woh foren render hojaye and screen par dikhe else hume har new note create karne par page bar bar reload karna padega
  })
}

function handleDeleteNote(noteId){
      console.log(noteId)
      axios.delete("http://localhost:3000/api/notes/"+noteId)  
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })
}

  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type='text' placeholder='Enter Title'></input>
        <input name='description' type='text' placeholder='Enter Description'></input>
        <button>Create Note</button>
    </form>
    <div className="notes">
      {
      notes.map(note =>{
      return <div className="note">
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
      </div>})}
    </div>
    </>
  )
}

export default App
