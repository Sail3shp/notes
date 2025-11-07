import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CreateNote from "./pages/CreateNote"
import NoteDetail from "./pages/NoteDetail"

function App() {

  return (
    <div className="bg-gray-950 min-h-screen">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreateNote />} />
        <Route path='/:id' element={<NoteDetail />} />
      </Routes>
    </div>
  )
}

export default App
