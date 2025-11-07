import { Pencil, Trash } from "lucide-react"
import { formatDate } from "../utils/dates"
import { Link } from "react-router"
import api from "../utils/axios"
import toast from 'react-hot-toast'

const NoteCard = ({note,setNotes}) => {
  const handleDelete = async(e, id) => {
    e.preventDefault()

    if(!window.confirm("Are you sure you want to delete this note?")) return
    try {
      await api.delete(`/${id}`)
      setNotes((prev) => prev.filter((note) => note._id !== id))
      toast.success("Note deleted successfully")
    } catch (error) {
      console.log("error in handleDelete")  
      toast.error("failed to delete")
    }
  }
  return (
    <Link to={`/${note._id}`}>
    <div className="block max-w-sm p-6 bg-gray-800 border border-t-emerald-500 rounded-lg  shadow-sm ">
        <h2 className="font-semibold text-2xl tracking-tight mb-2 text-white">{note.title}</h2>
        <p className="font-normal text-gray-300 ">{note.content.substring(0,50)} </p>
        <div className="flex flex-wrap m-1 justify-between">
            <p className="font-normal text-gray-300">{formatDate(new Date(note.createdAt))}</p>
            <div className="flex gap-1">
                <button><Pencil className="text-gray-300"/></button>
                <button className="cursor-pointer" onClick={(e) => handleDelete(e,note._id)}><Trash className="text-red-500 hover:text-red-900"/></button>
            </div>

        </div>
    </div>
    </Link>
  )
}

export default NoteCard