import axios from 'axios';
import { notesRepository } from './notes.repository';
import { NewNote, Note } from '../types/note';

jest.mock('../config', () => ({
  apiUrl: 'http://test',
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('notesRepository', () => {
  describe('getAll', () => {
    test('Then it should return a list of notes', async () => {
      const notes: Note[] = [
        { id: '1', content: 'Content 1', createdAt: '', importance: false },
        { id: '2', content: 'Content 2', createdAt: '', importance: false },
      ];

      mockedAxios.get.mockResolvedValue({ data: notes });
      const result = await notesRepository.getAll();

      expect(result).toEqual(notes);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://test');
    });

    test('Then it should throw an error', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Failed to fetch notes'));

      await expect(notesRepository.getAll()).rejects.toThrow(
        'Failed to fetch notes'
      );
    });
  });

  describe('create', () => {
    test('Then it should return the created note', async () => {
      const newNote: NewNote = {
        content: 'Content',
        createdAt: '',
        importance: false,
      };

      mockedAxios.post.mockResolvedValue({ data: newNote });
      const result = await notesRepository.create!(newNote);

      expect(result).toEqual(newNote);
      expect(mockedAxios.post).toHaveBeenCalledWith('http://test', newNote);
    });

    test('Then it should throw an error', async () => {
      const newNoteToFailed: NewNote = {
        content: 'Content',
        createdAt: '',
        importance: false,
      };

      mockedAxios.post.mockRejectedValue(
        new Error('Failed to create a new note')
      );

      await expect(notesRepository.create!(newNoteToFailed)).rejects.toThrow(
        'Failed to create a new note'
      );
    });
  });

  describe('update', () => {
    test('Then it should return the updated note', async () => {
      const note: Note = {
        id: '1',
        content: 'Content',
        createdAt: '',
        importance: false,
      };

      mockedAxios.put.mockResolvedValue({ data: note });
      const result = await notesRepository.update!(note);

      expect(result).toEqual(note);
      expect(mockedAxios.put).toHaveBeenCalledWith('http://test/1', note);
    });

    test('Then it should throw an error', async () => {
      const noteToFailed: Note = {
        id: '1',
        content: 'Content',
        createdAt: '',
        importance: false,
      };

      mockedAxios.put.mockRejectedValue(new Error('Failed to update the note'));

      await expect(notesRepository.update!(noteToFailed)).rejects.toThrow(
        'Failed to update the note'
      );
    });
  });

  describe('delete', () => {
    test('Then it should return the deleted note', async () => {
      const id: string = '1';

      mockedAxios.delete.mockResolvedValue({ status: 200, data: id });
      const result = await notesRepository.delete!(id);

      expect(result).toEqual(id);
      expect(mockedAxios.delete).toHaveBeenCalledWith('http://test/1');
    });

    test('Then it should throw an error when not fount note', async () => {
      const idToNotFound: string = '1';

      mockedAxios.delete.mockResolvedValue({ status: 404 });

      await expect(notesRepository.delete!(idToNotFound)).rejects.toThrow(
        'Failed to delete the note'
      );
    });

    test('Then it should throw an error for other status codes', async () => {
      const idToFailed: string = '1';

      mockedAxios.delete.mockResolvedValue({ status: 500 });

      await expect(notesRepository.delete!(idToFailed)).rejects.toThrow(
        'Failed to delete the note'
      );
    });

    test('Then it should throw an error', async () => {
      const idToFailed: string = '1';

      mockedAxios.delete.mockRejectedValue(
        new Error('Failed to delete the note')
      );

      await expect(notesRepository.delete!(idToFailed)).rejects.toThrow(
        'Failed to delete the note'
      );
    });
  });
});
