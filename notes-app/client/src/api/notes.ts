import axios from "axios";

const API = "http://localhost:3000";

export const getNotes = () =>
    axios.get(`${API}/notes`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });