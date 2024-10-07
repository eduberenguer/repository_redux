import { useEffect, useState } from 'react';
import { notesRepository } from '../services/notes.repository';
import { NewNote, Note } from '../types/note';

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const totalNotes = await notesRepository.getAll();
      setNotes(totalNotes);
    };

    fetchNotes();
  }, []);

  const createNote = async (note: NewNote) => {
    const newNote = await notesRepository.create!(note);
    setNotes([...notes, newNote]);
  };

  return { notes, createNote };
};

export default useNotes;
