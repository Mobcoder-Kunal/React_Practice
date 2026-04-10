import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

import authRoutes from "./routes/auth"
import notesRouter from "./routes/notes";



import { connectDB } from "./db";
connectDB();



app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes)
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
    res.json({
        message: "API is working 🚀",
        status: "success"
    });
});
app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
});