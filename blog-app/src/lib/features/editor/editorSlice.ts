import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorBlock, EditorState } from "./types";

const initialState: EditorState = {
    blocks: [
        { id: '1', type: 'heading', content: '' },
        { id: '2', type: 'text', content: '' },
    ],
    activeBlockId: '1',
    isSaving: false,
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        updateBlockContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
            const block = state.blocks.find(block => block.id === action.payload.id);
            if (block) {
                block.content = action.payload.content;
            }
        },
        addBlock: (state, action: PayloadAction<{ afterId: string, type: EditorBlock['type'] }>) => {
            const index = state.blocks.findIndex(block => block.id === action.payload.afterId)
            const newBlock: EditorBlock = {
                id: crypto.randomUUID(),
                type: action.payload.type,
                content: '',
            };

            // If index is -1 (not found), it adds to the end. 
            // Otherwise, it adds right after the current block.
            const insertAt = index === -1 ? state.blocks.length : index + 1;

            state.blocks.splice(insertAt, 0, newBlock);
            state.activeBlockId = newBlock.id;
        },
        deleteBlock: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.blocks.findIndex(block => block.id === action.payload.id);

            if (index > 0) {
                const previousBlock = state.blocks[index - 1];
                state.activeBlockId = previousBlock.id;
                state.blocks.splice(index, 1);
            }
        },
        changeBlockType: (state, action: PayloadAction<{ id: string, type: EditorBlock['type'] }>) => {
            const block = state.blocks.find(block => block.id === action.payload.id);
            if (block) {
                block.type = action.payload.type;
                if (action.payload.type === 'image') {
                    // Default placeholder until they upload
                    block.content = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800';
                } else {
                    block.content = block.content.replace('/', '');
                }
            }
        },
        mergeWithPrevious: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.blocks.findIndex(block => block.id === action.payload.id);

            if (index > 0) {
                const currentBlock = state.blocks[index];
                const previousBlock = state.blocks[index - 1];

                const combinedContent = previousBlock.content + currentBlock.content;
                previousBlock.content = combinedContent;
                state.activeBlockId = previousBlock.id;
                state.blocks.splice(index, 1);
            }
        }
    },
});

export const { updateBlockContent, addBlock, deleteBlock, changeBlockType, mergeWithPrevious } = editorSlice.actions;
export default editorSlice.reducer;