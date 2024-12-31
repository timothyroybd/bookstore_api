import axios from "axios";
const api = axios.create({
    baseURL: "https://bookstore-api-n50c.onrender.com/",
});

export default api;