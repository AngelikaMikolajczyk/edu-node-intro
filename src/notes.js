import { insertDB, getDB, saveDB } from "./db.js";

export async function newNote(note, tags) {
    const newNote = {
        tags,
        id: Date.now(),
        content: note
    }

    await insertDB(newNote);
    return newNote;
}

export async function getAllNotes() {
    const { notes } = await getDB();
    return notes;
}

export async function findNotes(filter) {
    const { notes } = await getDB();
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()));
}

export async function removeNote(id) {
    const { notes } = await getDB();
    const match = notes.find(note => note.id === id);

    if(match) {
        const newNotes = notes.filter(note => note.id !== id);
        await saveDB({notes: newNotes});
        return id;
    }
}

export function removeAllNotes() {
    return saveDB({notes: []});
}
