import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "../api/notes";
import { useNavigate } from "react-router-dom";

export default function Notes() {
    type Note = {
        _id: string;
        title: string;
        content: string;
    };

    const [notes, setNotes] = useState<Note[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await getNotes();
                setNotes(res.data)
            } catch (err) {
                alert("Failed to fetch notes!")
            }
        }
        fetchNotes();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddNote = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Please fill all fields")
            return
        }

        try {
            setLoading(true)

            const res = await createNote({ title, content })

            const newNote = res.data.note || res.data
            setNotes(prev => [newNote, ...prev])

            setTitle("")
            setContent("")
            setShowForm(false)
        } catch (err) {
            alert("Failed to add note!")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteNote(id)

            setNotes(prev => prev.filter(note => note._id !== id))
        } catch (err) {
            alert("Failed to delete note")
        }
    }

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const handleUpdate = async (id: string) => {
        try {
            const res = await updateNote(id, {
                title: editTitle,
                content: editContent,
            });

            setNotes((prev) =>
                prev.map((note) =>
                    note._id === id ? res.data : note
                )
            );

            setEditingId(null);
        } catch (err) {
            alert("Update failed");
        }
    };

    const [search, setSearch] = useState("");

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>My Notes</h1>

                <button onClick={logout}>Logout</button>
            </div>

            <hr />

            <input
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "8px",
                    margin: "10px 0",
                    width: "100%",
                    maxWidth: "300px"
                }}
            />

            <button onClick={() => setShowForm((prev) => !prev)}>
                {showForm ? "Cancel" : "Add Note"}
            </button>

            {showForm && (
                <div style={{ margin: "20px 0" }}>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <br />

                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <br />

                    <button onClick={handleAddNote} disabled={loading}>
                        {loading ? "Saving..." : "Save Note"}
                    </button>
                </div>
            )}
            {filteredNotes.length === 0 ? (
                <p>No notes found</p>
            ) : (
                filteredNotes.map((note) => (
                    <div
                        key={note._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: 10,
                            marginBottom: 10,
                            borderRadius: 8,
                        }}
                    >
                        {editingId === note._id ? (
                            <>
                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />

                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />

                                <button onClick={() => handleUpdate(note._id)}>
                                    Save
                                </button>

                                <button onClick={() => setEditingId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>

                                <button
                                    onClick={() => {
                                        setEditingId(note._id);
                                        setEditTitle(note.title);
                                        setEditContent(note.content);
                                    }}
                                >
                                    Edit
                                </button>

                                <button onClick={() => handleDelete(note._id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ))
            )}


        </div>
    );
}