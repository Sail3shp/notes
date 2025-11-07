import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl p-3">
            <h1 className="font-semibold text-2xl text-white tracking-wider">MyNote</h1>
            <Link to='/create'><button className="bg-emerald-500 p-4 rounded-full cursor-pointer hover:bg-emerald-600"> + New Note</button></Link>
        </div>
    </nav>
  )
}

export default Navbar