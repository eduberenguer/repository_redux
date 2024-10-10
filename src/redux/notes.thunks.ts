import { createAsyncThunk } from '@reduxjs/toolkit';
import { notesRepository } from '../services/notes.repository';
import { NewNote, Note } from '../types/note';
import { ApiResponse } from '../types/apiResponse';

export const fetchNotes = createAsyncThunk<ApiResponse[], void>(
  'notes/fetchNotes',
  async () => {
    try {
      return await notesRepository.getAll();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const createNewNote = createAsyncThunk<ApiResponse, NewNote>(
  'notes/createNewNote',
  async (note: NewNote) => {
    try {
      return await notesRepository.create!(note);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const changeImportanceNote = createAsyncThunk<ApiResponse, Note>(
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
