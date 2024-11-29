import fs from 'node:fs/promises';
import path from 'node:path';

const DB_PATH = path.join("..", "intro-node/db.json");

export async function getDB () {
    const db = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(db);
} 

export async function saveDB (db) {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

export async function insertDB(note) {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
}