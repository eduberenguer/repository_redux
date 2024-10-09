import { Note } from '../../types/note';

export const DetailNote = ({
  note,
  changeImportance,
  removeNote,
}: {
  note: Note;
  changeImportance: (id: string) => void;
  removeNote: (id: string) => void;
}) => {
  return (
    <li>
      {note.content} -
      <button onClick={() => changeImportance(note.id)}>
        {String(note.importance)}
      </button>
      <button onClick={() => removeNote(note.id)}>X</button>
    </li>
  );
};
