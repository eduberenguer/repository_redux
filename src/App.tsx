import { useState } from 'react';
import useNotes from './hooks/useNotes';

function App() {
  const [newNote, setNewNote] = useState('');
  const { notes, createNote } = useNotes();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const note = {
      content: newNote,
      important: false,
      createdAt: new Date().toISOString(),
    };

    createNote(note);
    setNewNote('');
  };

  return (
    <>
      <h1>NOTES</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} value={newNote} />
        <button type="submit">Create</button>
      </form>
      <ul>
        {notes.map((note) => (
          <div key={note.id}>
            <li>
              {note.content} - {String(note.important)}
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
