import '@testing-library/jest-dom';
import { waitFor, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../store/store';

import { App } from './App';
import { useNotes } from '../hooks/use.notes';

jest.mock('../config', () => ({
  url: '',
}));

jest.mock('../hooks/use.notes', () => ({
  useNotes: jest.fn().mockReturnValue({
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
  }),
}));

describe('App', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test('Should be render App', async () => {
    await waitFor(() => {
      const title = screen.getByText('NOTES');

      expect(title).toBeInTheDocument();
    });
  });

  test('Should be render App', async () => {
    await waitFor(() => {
      const notes = screen.getAllByRole('listitem');

      expect(notes).toHaveLength(1);
    });
  });

  describe('App - Loading State', () => {
    beforeEach(() => {
      useNotes().status = 'loading';
    });

    test('Should show loading status', async () => {
      await waitFor(() => {
        const loadingText = screen.getByText('loading');

        expect(loadingText).toBeInTheDocument();
      });
    });
  });

  describe('App - Failed State', () => {
    beforeEach(() => {
      useNotes().status = 'failed';
      useNotes().message = 'Error';
    });

    test('Should show failed status', async () => {
      await waitFor(() => {
        const loadingText = screen.getByText('Error');

        expect(loadingText).toBeInTheDocument();
      });
    });
  });
});
