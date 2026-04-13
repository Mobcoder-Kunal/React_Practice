import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async () => {
        const res = await login({ email, password });

        localStorage.setItem("token", res.data.token);

        navigate("/notes")
    };

    return (
        <div>
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}