import axios from 'axios';
import { Repository } from './repository';
import { apiUrl } from '../config';
import { NewNote, Note } from '../types/note';

export const notesRepository: Repository<Note, NewNote> = {
  getAll: async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  },

  create: async (note: NewNote) => {
    const response = await axios.post(apiUrl, note);
    return response.data as Note;
  },
};
