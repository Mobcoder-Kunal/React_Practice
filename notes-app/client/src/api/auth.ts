import axios from "axios";

const API = "http://localhost:3000";

export const register = (data: any) =>
    axios.post(`${API}/auth/register`, data);

export const login = (data: any) =>
    axios.post(`${API}/auth/login`, data);