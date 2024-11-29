import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { findNotes, getAllNotes, newNote, removeAllNotes, removeNote } from './notes.js';
import { start } from './server.js';

// yargs(hideBin(process.argv))
//   .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
//     console.info(argv)
//   })
//   .demandCommand(1)
//   .parse()

function listNotes (notes) {
  notes.forEach(note => {
    console.log("id: ", note.id);
    console.log("tags: ", note.tags);
    console.log("content: ", note.content);
    console.log('\n');
  });
}

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', (yargs) => {
    return yargs.positional('note', {
        type: 'string',
        description: 'The content of the note to create'
    })
  }, async (argv) => {
    const tags = argv.tags ? argv.tags.split(',') : [];
    const note = await newNote(argv.note, tags);
    console.log('New note!', note);
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async (argv) => {
    const allNotes = await getAllNotes();
    listNotes(allNotes);
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {
    const matches = await findNotes(argv.filter);
    listNotes(matches);
  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    const id = await removeNote(argv.id);
    console.log(id);
  })
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {
    const allNotes = await getAllNotes();
    start(allNotes, argv.port);
  })
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await removeAllNotes();
    console.log('db cleaned');
  })
  .demandCommand(1)
  .parse()

//   [] argument opcjonalny
//   <> argument wymagany