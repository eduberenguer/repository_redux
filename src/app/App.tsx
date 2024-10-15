import { DetailNote } from '../components/detail.note/detail.note';
import { NoteForm } from '../components/note.form/note.form';
import { useNotes } from '../hooks/use.notes';

export function App() {
  const { notes, status, message, createNote, changeImportance, removeNote } =
    useNotes();

  return (
    <>
      <h1>NOTES</h1>
      <NoteForm createNote={createNote} />
      {status !== 'loading' ? (
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
      ) : (
        <p>{status}</p>
      )}
      {status === 'failed' && <p>{message}</p>}
    </>
  );
}
