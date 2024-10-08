import useNotes from './hooks/useNotes';
import { NoteForm } from './components/note.form/noteForm';

function App() {
  const { notes, status, message, createNote, changeImportance, removeNote } =
    useNotes();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>{message}</p>;
  }

  return (
    <>
      <h1>NOTES</h1>
      <NoteForm createNote={createNote} />
      <ul>
        {notes.map((note) => (
          <div key={note.id}>
            <li>
              {note.content} -
              <button onClick={() => changeImportance(note.id)}>
                {String(note.importance)}
              </button>
              <button onClick={() => removeNote('123')}>X</button>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
