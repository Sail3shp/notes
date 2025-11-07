import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:8888/api/notes' : "/api/notes"
const api = axios.create({
    baseURL: BASE_URL,
})
export default api