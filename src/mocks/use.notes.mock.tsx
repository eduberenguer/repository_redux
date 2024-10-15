import '@testing-library/jest-dom';

export const useNoteMock = {
  notes: [
    {
      id: '1',
      content: 'Note',
      createdAt: '2024-10-15T14:44:20.076Z',
      importance: false,
    },
  ],
  status: 'idle',
  message: '',
  createNote: jest.fn(),
  changeImportance: jest.fn(),
  removeNote: jest.fn(),
};
