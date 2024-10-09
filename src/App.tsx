import useNotes from './hooks/useNotes';
import { NoteForm } from './components/note.form/noteForm';
import { DetailNote } from './components/detail.note/detail.note';

function App() {
  const { notes, status, message, createNote, changeImportance, removeNote } =
    useNotes();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>NOTES</h1>
      <NoteForm createNote={createNote} />
      <ul>
        {notes.map((note) => (
          <DetailNote
            key={note.id}
            note={note}
            changeImportance={changeImportance}
            removeNote={removeNote}
          />
        ))}
      </ul>
      {status === 'failed' && <p>{message}</p>}
    </>
  );
}

export default App;
