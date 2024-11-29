import fs from 'node:fs/promises';
import path from 'node:path';

const readPjson = async () => {
    // const pjsonPath = new URL('./package.json', import.meta.url).pathname;
    const pjsonPath = path.join(".", "package.json")
    console.log('pjsonPath', pjsonPath);
    
    // console.log(JSON.parse(await fs.readFile(decodeURIComponent(pjsonPath.slice(1)), 'utf-8')));
    console.log(JSON.parse(await fs.readFile(pjsonPath, 'utf-8')));
}

const writeFile = async () => {
    // const newFile = new URL('./demo.js', import.meta.url).pathname;
    const newFile = path.join(".", "demo.js");
    await fs.writeFile(newFile, `console.log('hello from new file')`);
}

readPjson();
// writeFile();