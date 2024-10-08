import { createSlice } from '@reduxjs/toolkit';
import { Note } from '../types/note';
import {
  fetchNotes,
  createNewNote,
  changeImportanceNote,
  deleteNote,
} from './notes.thunks';

interface NoteState {
  notes: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  message: string;
}

const initialState: NoteState = {
  notes: [],
  status: 'idle',
  message: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createNewNote.fulfilled, (state, action) => ({
        ...state,
        notes: [...state.notes, action.payload],
      }))
      .addCase(changeImportanceNote.fulfilled, (state, action) => {
        state.notes = state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        );
        state.status = 'succeeded';
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.status === 'succeeded';
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = 'failed';
        state.message = (action.payload as string) || 'Note not found';
      });
  },
});

export default notesSlice.reducer;
