import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewNote, Note } from '../types/note';

import { AppDispatch, RootState } from '../store/store';
import {
  fetchNotes,
  createNewNote,
  changeImportanceNote,
  deleteNote,
} from '../redux/notes.thunks';

export const useNotes = () => {
  const dispatch: AppDispatch = useDispatch();
  const { notes, status, message } = useSelector(
    (state: RootState) => state.notes
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotes());
    }
  }, [dispatch, status]);

  const createNote = (note: NewNote) => {
    dispatch(createNewNote(note));
  };

  const changeImportance = (id: string) => {
    const note = notes.find((note) => note.id === id);
    const newNote = {
      ...note,
      importance: !note?.importance,
    };
    if (note) {
      dispatch(changeImportanceNote(newNote as Note));
    }
  };

  const removeNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  return { notes, status, message, createNote, changeImportance, removeNote };
};
