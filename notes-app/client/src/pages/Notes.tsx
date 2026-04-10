import { useEffect, useState } from "react";
import { getNotes } from "../api/notes";

export default function Notes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes().then((res) => setNotes(res.data));
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div style={{ padding: 20 }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>My Notes</h1>

                <button onClick={logout}>Logout</button>
            </div>

            <hr />

            {notes.length === 0 ? (
                <p>No notes found</p>
            ) : (
                notes.map((note: any) => (
                    <div
                        key={note._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: 10,
                            marginBottom: 10,
                            borderRadius: 8,
                        }}
                    >
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}