import { useState } from "react"
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import { useEffect } from "react"
import api from '../utils/axios.js'


const HomePage = () => {
  const[notes,setNotes] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchNotes = async() => {
       setLoading(true)
       const response = await api.get('/') 
       setNotes(response.data)
       setLoading(false)
    }
    fetchNotes()
  },[])
  console.log(notes)
  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto p-2 m-2 grid gap-2 sm:grid-cols-1 md:grid-cols-3 ">
        {notes.map(note => <NoteCard key={note._id} note={note} setNotes={setNotes} />)}
    </div>
    

    </>
  )
}

export default HomePage