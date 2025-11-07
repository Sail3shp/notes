import express from 'express'
import { createNote,getNoteById,getAllNotes,updateNote,deleteNote} from '../controllers/notes.controllers.js'
const router = express.Router()

router.post('/',createNote)

router.get('/:id',getNoteById)

router.get('/',getAllNotes)

router.put('/:id',updateNote)

router.delete('/:id',deleteNote)

export default router

