import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register({ email, password });

            alert("User registered successfully");
            
            navigate("/login");
        } catch (err: any) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Register</h1>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <button onClick={handleRegister}>Register</button>
        </div>
    );
}