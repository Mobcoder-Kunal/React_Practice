import express, { response } from "express";
import { Note } from "../models/note";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/", authMiddleware, async (req: any, res) => {
    const { title, content } = req.body;
    const note = await Note.create({
        title,
        content,
        userId: req.userId
    })

    res.json({ note })
})


router.get("/", authMiddleware, async (req: any, res) => {
    const notes = await Note.find({ userId: req.userId })
    res.json(notes)
})

router.delete("/:id", authMiddleware, async (req: any, res) => {
    await Note.deleteOne({
        _id: req.params.id,
        userId: req.userId,
    })

    res.json({
        message: "Note deleted successfully"
    });
})

router.put("/:id", authMiddleware, async (req: any, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id, userId: req.userId
            },
            {
                title, content
            },
            {
                new: true,
            }
        )
        res.json(note)
    }
    catch {
        response.status(500).json({ message: "Update failed!" })
    }
})

export default router