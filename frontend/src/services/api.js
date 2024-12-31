import axios from "axios";
const apiBaseUrl = `https://bookstore-api-n50c.onrender.com/`
const api = axios.create({
    baseURL: apiBaseUrl,
});

export default api;