import { Link, useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import api from '../utils/axios.js'
import toast from "react-hot-toast"

const CreateNote = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleCreate = async(e) => {
        e.preventDefault()
        if(!title.trim() || !content.trim()){
            toast.error("All fields are required")
            return
        }
        setLoading(true)
        try {
            await api.post("/",{
                title,
                content
            })
            toast.success("Note created successfully!")
            navigate("/")
        } catch (error) {
            console.log("Error creating note",error)
            
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className=" flex flex-col max-w-xl mx-auto  bg-slate-600 rounded-lg p-4 space-y-4 ">
        <Link to='/' className="flex p-1 hover:text-gray-300"> <ArrowLeft />Back to Note List</Link>
        <h1 className="text-2xl font-semibold tracking-wide">Create New Note</h1>
        <div className="mb-6">
            <label htmlFor="title">Title</label>
            <input 
            type="text" 
            id='title' 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 block w-full text-sm  rounded-lg p-2.5" />
        </div>
        <div className="mb-4">
            <label htmlFor="content">Content</label>
            <textarea 
            id='content'
            className="bg-gray-50 border border-gray-300 block w-full text-sm rounded-md p-2"
            rows={4}
            cols={40}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
        </div>
        <button 
        className="bg-emerald-400 hover:bg-emerald-500 rounded-2xl p-2 mx-auto cursor-pointer"
        onClick={handleCreate} 
        disabled={loading}
        >{loading ? '...Creating' :'Create Note' }</button>

    </div>
  )
}

export default CreateNote