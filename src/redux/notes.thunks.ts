import { createAsyncThunk } from '@reduxjs/toolkit';
import { notesRepository } from '../services/notes.repository';
import { NewNote, Note } from '../types/note';

interface ApiAnswer {
  id: string;
  content: string;
  importance: boolean;
  createdAt: string;
}

export const fetchNotes = createAsyncThunk<ApiAnswer[], void>(
  'notes/fetchNotes',
  async () => {
    try {
      return await notesRepository.getAll();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const createNewNote = createAsyncThunk<ApiAnswer, NewNote>(
  'notes/createNewNote',
  async (note: NewNote) => {
    try {
      return await notesRepository.create!(note);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const changeImportanceNote = createAsyncThunk<ApiAnswer, Note>(
  'notes/changeImportanceNote',
  async (note: Note) => {
    try {
      return await notesRepository.update!(note);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const deleteNote = createAsyncThunk<string, string>(
  'notes/deleteNote',
  async (id: string, { rejectWithValue }) => {
    try {
      await notesRepository.delete!(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
