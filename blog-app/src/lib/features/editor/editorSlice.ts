import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorBlock, EditorState } from "./types";

const initialState: EditorState = {
    blocks: [
        { id: '1', type: 'heading', content: 'Welcome to your Notion Clone' },
        { id: '2', type: 'text', content: 'Click here to start editing...' },
    ],
    activeBlocksId: null,
    isSaving: false,
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        updateBlockContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
            const block = state.blocks.find(block => block.id = action.payload.id);
            if (block) {
                block.content = action.payload.content;
            }
        },
        addBlock: (state, action: PayloadAction<{afterId: string, type: EditorBlock['type']}>) => {
            const index = state.blocks.find(block => block.id === action.payload.afterId)
            const newBlock: EditorBlock = {
                id: crypto.randomUUID(),
                type: action.payload.type,
                content: '',
            };
            state.blocks.splice(index + 1, 0, newBlock);
            state.activeBlocksId = newBlock.id;
        },
    },
});

export const { updateBlockContent, addBlock } = editorSlice.actions;
export default editorSlice.reducer;