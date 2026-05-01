import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
    id: String,
    type: { type: String, enum: ['text', 'heading', 'image'] },
    content: String,
})
const PageSchema = new mongoose.Schema({
    title: { type: String, default: "Untitled" },
    blocks: [
        {
            id: String,
            type: { type: String, enum: ['text', 'heading', 'image', 'todo'] },
            content: String
        }
    ],
    isPublic: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now }
});

const Page = mongoose.model('page', PageSchema)
export default Page;