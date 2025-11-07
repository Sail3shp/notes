import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimiter from './middleware/rateLimiter.js'

import { connectDB } from './config/db.js'
import notesRoutes from './routes/notesRoutes.js'
dotenv.config()

const app = express()
const PORT =  process.env.PORT || 9999

app.use(cors())
app.use(express.json())
app.use(rateLimiter)
app.use('/api/notes',notesRoutes)

connectDB().then(() => {
    app.listen(PORT,() => {
    console.log('server is running on port:',PORT)
})
})
