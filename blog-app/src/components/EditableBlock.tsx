'use client';
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { useAppSelector } from "../lib/hooks";
import { updateBlockContent, addBlock, deleteBlock, changeBlockType, mergeWithPrevious } from "../lib/features/editor/editorSlice";
import { EditorBlock } from "../lib/features/editor/types";
import CommandMenu from "./CommandMenu";

interface Props {
    block: EditorBlock,
}

function EditableBlock({ block }: Props) {
    const dispatch = useAppDispatch();
    const contentRef = useRef<HTMLDivElement>(null);

    // Grab the ID of block that should focus
    const activeBlockId = useAppSelector((state) => state.editor.activeBlockId);

    const [showMenu, setShowMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

    const isTyping = useRef(false);

    // Focus logic
    useEffect(() => {
        if (activeBlockId === block.id && contentRef.current) {
            contentRef.current.focus();

            // Move cursor to the end of the text -> Notion behaviour
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(contentRef.current);
            range.collapse(false); // false means "collapse to end"
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, [activeBlockId, block.id])

    // Sync logic
    useEffect(() => {
        const domElement = contentRef.current;
        if (!domElement || isTyping.current) {
            isTyping.current = false;
            return;
        }

        if (domElement.innerText !== block.content) {
            domElement.innerText = block.content;
        }
    }, [block.content, block.type]);
    const handleInput = () => {
        if (contentRef.current) {
            isTyping.current = true;
            const text = contentRef.current.innerText;
            dispatch(
                updateBlockContent({
                    id: block.id,
                    content: text,
                })
            )
            if (text.endsWith('/')) {
                const selection = window.getSelection();    // Finds exactly where the blinking cursor is
                const range = selection?.getRangeAt(0);    // Grabs the specific "slice" of the document where that cursor sits.
                const rect = range?.getBoundingClientRect();// This is the magic. It gives you the pixel coordinates (X and Y) of the cursor relative to the screen.

                if (rect) {
                    setMenuPosition({ x: rect.left, y: rect.bottom }) // We save those pixels so we can tell our Menu exactly where to "pop up" on the screen.
                    setShowMenu(true)
                } else {
                    setShowMenu(false)
                }
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // We tell Redux to add a new block right after this one
            dispatch(
                addBlock({
                    afterId: block.id,
                    type: 'text'
                })
            );
        }

        if (e.key === 'Backspace') {
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);

            if (range?.startOffset === 0) {
                e.preventDefault();
                dispatch(mergeWithPrevious({ id: block.id }));
            }
        }
    }

    const handleSelect = (type: 'text' | 'heading') => {
        dispatch(changeBlockType({ id: block.id, type }));
        setShowMenu(false);
    }

    if (block.type === 'image') {
        return (
            <div className="group relative my-4">
                {/* The Image Container */}
                <div className="relative overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-400 transition-all">
                    <img
                        src={block.content || 'https://via.placeholder.com/800x400?text=Click+to+upload+image'}
                        alt="User content"
                        className="w-full h-auto block"
                    />

                    {/* Overlay to delete or change image */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => dispatch(deleteBlock({ id: block.id }))}
                            className="bg-white/90 p-2 rounded-md shadow-sm hover:bg-red-50 text-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="relative">
            <div
                ref={contentRef}
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                className={`
                w-full p-2 rounded-md transition-all duration-150 outline-none
                hover:bg-slate-50 
                ${block.content === '' ? 'border border-dashed border-slate-100' : 'border border-transparent'}
                focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-transparent
                ${block.type === 'heading' ? 'text-4xl font-bold mb-4 mt-2' : 'text-lg mb-2'}
            `}
                placeholder={block.type === 'heading' ? 'Heading 1' : "Type '/' for commands..."}
                style={{ minHeight: '1.5em' }}
            >
                {showMenu && (
                    <CommandMenu
                        position={menuPosition}
                        onSelect={handleSelect}
                        close={() => setShowMenu(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default EditableBlock;


// 1. Why contentEditable instead of <input>?
// In Notion, blocks can grow vertically as you type long paragraphs. A standard <input> or <textarea> is hard to style and doesn't auto-resize easily. Using a div with contentEditable allows the block to look like natural text (Medium-style) but still be interactive.

// 2. How to read styles[block.type as keyof typeof styles]?
// This is a TypeScript Power Move.

// We have an object called styles with keys like heading and text.

// block.type is a string from our Redux store.

// as keyof typeof styles tells TypeScript: "Trust me, the string in block.type is definitely one of the keys in the styles object." This prevents a red underline error.

// 3. The onInput vs onChange
// With contentEditable, standard onChange doesn't always fire correctly. We use onInput because it catches every single character change, ensuring your Redux store is perfectly synced with what is on the screen.