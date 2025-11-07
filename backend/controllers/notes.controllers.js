import Note from "../models/notes.model.js"

export const createNote = async(req,res) => {
    const {title,content} = req.body
    if(!title || !content){
        return res.status(400).json('Please enter both of your fields')
    }
    try {
        const note = await Note.create({
            title,
            content
        })
        console.log(note)
        res.send(note)
    } catch (error) {
        console.log('error while creating note')
        res.status(500).json("Internal server error")
    }
}

export const getAllNotes = async(_,res) => {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        return res.status(200).json(notes)
    } catch (error) {
        console.log("error in getting all notes")
        res.status(500).json("Internal server error")
    }
}

export const getNoteById = async(req,res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json("not not found")
        return res.status(200).json(note)
    } catch (error) {
        console.log("Error in getting notes by id")
        res.status(500).json('Internal server error')
    }
}

export const updateNote = async(req,res) => {
    try {
        const {title,content} = req.body
        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new:true,
            }
        )
        if(!updated) return res.status(404).json("note not found")
        res.status(201).json(updated)
    } catch (error) {
        console.log("error in updating note")
        res.status(500).json("Internal server error")
    }
}

export const deleteNote = async(req,res) => {
    try {
        console.log(req.params.id)
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json("note not found")
        res.status(200).json("Note deleted successfully")
    } catch (error) {
        console.log("error in deleting note")
        res.status(500).json("Internal server error")
    }
}