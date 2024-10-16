import axios from 'axios';
import { Repository } from './repository';
import { apiUrl } from '../config';
import { NewNote, Note } from '../types/note';
import { ApiResponse } from '../types/apiResponse';

export const notesRepository: Repository<Note, NewNote> = {
  getAll: async (): Promise<Note[]> => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch notes');
    }
  },

  create: async (note: NewNote): Promise<ApiResponse> => {
    try {
      const response = await axios.post(apiUrl, note);
      return response.data as Note;
    } catch (error) {
      throw new Error('Failed to create a new note');
    }
  },

  update: async (note: Note): Promise<ApiResponse> => {
    try {
      const response = await axios.put(`${apiUrl}/${note.id}`, note);
      return response.data as Note;
    } catch (error) {
      throw new Error('Failed to update the note');
    }
  },

  delete: async (id: string): Promise<string> => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);

      if (response.status === 404) {
        throw new Error('Note not found');
      }

      if (response.status === 200) {
        return response.data;
      }

      throw new Error('Failed to delete the note');
    } catch (error) {
      throw new Error('Failed to delete the note');
    }
  },
};
