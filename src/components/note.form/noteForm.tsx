import { useState } from 'react';
import { NewNote } from '../../types/note';

export const NoteForm = ({
  createNote,
}: {
  createNote: (note: NewNote) => void;
}) => {
  const [newNote, setNewNote] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const note = {
      content: newNote,
      importance: false,
      createdAt: new Date().toISOString(),
    };

    createNote(note);
    setNewNote('');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" onChange={(e) => handleChange(e)} value={newNote} />
      <button type="submit">Create</button>
    </form>
  );
};
