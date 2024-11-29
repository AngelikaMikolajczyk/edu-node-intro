import fs from 'node:fs/promises'
import http from 'node:http'
import open from 'open'
import path from 'node:path'

export const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || '';
  });
}

export function formatNotes(notes) {
    return notes.map(note => {
        return `<div class="note">
         <p>${note.content}</p>
            <div class="tags">
             ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>`
    }).join('\n')
}

export function createServer(notes) {
    return http.createServer(async (req, res) => {
        const HTML_PATH = new URL('./template.html', import.meta.url).pathname
        const template = await fs.readFile(decodeURIComponent(HTML_PATH.slice(1)), "utf-8");
        const html = interpolate(template,  {notes: formatNotes(notes)});
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(html);
    });
}

export function start(notes, port) {
    const server = createServer(notes);
    server.listen(port, () => {
        const address = `http://localhost:${port}`
        console.log(`Server is listening on ${address}`);
        open(address);
    })
}