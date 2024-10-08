import { createAsyncThunk } from '@reduxjs/toolkit';
import { notesRepository } from '../services/notes.repository';
import { NewNote, Note } from '../types/note';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  try {
    return await notesRepository.getAll();
  } catch (error) {
    throw new Error((error as Error).message);
  }
});

export const createNewNote = createAsyncThunk(
  'notes/createNewNote',
  async (note: NewNote) => {
    try {
      return await notesRepository.create!(note);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const changeImportanceNote = createAsyncThunk(
  'notes/changeImportanceNote',
  async (note: Note) => {
    try {
      return await notesRepository.update!(note);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: string, { rejectWithValue }) => {
    try {
      const deleteNote = await notesRepository.delete!(id);
      return deleteNote.id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
