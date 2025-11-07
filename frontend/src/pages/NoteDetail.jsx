import { ArrowLeft, LoaderIcon, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../utils/axios"
import toast from "react-hot-toast"
const NoteDetail = () => {
    const [note,setNote] = useState('')
    const [loading,setLoading] = useState(true)
    const [saving,setSaving] = useState(false)

    const navigate = useNavigate()
    const {id} = useParams()
    
    useEffect(() => {
        const fetchNote = async() => {
            try {
                const res = await api.get(`${id}`)
                setNote(res.data)
            } catch (error) {
                console.log("error in fetching note",error)
                toast.error("Failed to fetch the note")
            }finally{
                setLoading(false)
            }
        }
        fetchNote()
    },[id])
    console.log(note)

    const handleDelete = async() => {
        if(!window.confirm("Are you sure you want to delete this?")) return
        try {
            await api.delete(`${id}`)
            toast.success("Not deleted successfully")
            navigate('/')
        } catch (error) {
            console.log("error while deleting note",error)
            toast.error("Note can't be deleted")
        }
    }

    const handleSave = async() => {
        if(!note.title.trim() || !note.content.trim()){
            toast.error("please add a title or content")
            return
        }
        setSaving(true)

        try {
            await api.put(`${id}`,note)
            toast.success("Note updated")
            navigate('/')
        } catch (error) {
            console.log("Erro in saving the note",error)
            toast.error("Failed to update")
        }finally{
            setSaving(false)
        }
    }
    
    if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-white" />
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-2 justify-center  max-w-md bg-gray-100 p-4 mx-auto shadow-emerald-300   rounded-md">
        <div className="flex justify-between mb-4">
            <div><Link to='/' className="flex"><ArrowLeft />Back to Notes</Link></div>
            <button onClick={handleDelete} className="flex border border-red-400 rounded-lg p-1 text-sm hover:bg-red-400"><Trash  /> Delete Note</button>
        </div>
        <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input type='text'
            id="title"
            value={note.title}
            onChange={(e) => {setNote({...note,title:e.target.value})}}
            className="block w-full p-2 rounded-md bg-gray-300"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="content">Content</label>
            <textarea type='text'
            id='content'
            value={note.content}
            onChange={(e) => setNote({...note,content:e.target.value})}
            className="block w-full p-2 rounded-md bg-gray-300"
            />
        </div>
        <button onClick={handleSave} className="rounded-md p-1 hover:border-emerald-400 cursor-pointer hover:text-emerald-400 border border-gray-300">{saving?'saving...':'save'}</button>

        
    </div>
  )
}

export default NoteDetail