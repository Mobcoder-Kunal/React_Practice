import api from "./axios"

export const getNotes = () => {
    return api.get("/notes");
};

export const createNote = (data: {
    title: string;
    content: string;
}) => {
    return api.post("/notes", data);
};

export const deleteNote = (id: string) => {
    return api.delete(`/notes/${id}`);
};

export const updateNote = (
    id: string,
    data: { title: string; content: string }
) => {
    return api.put(`/notes/${id}`, data);
};