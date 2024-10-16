import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

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

  test('Should be render App', () => {
    const title = screen.getByText('NOTES');

    expect(title).toBeInTheDocument();
  });

  test('Should be render App', () => {
    const notes = screen.getAllByRole('listitem');

    expect(notes).toHaveLength(1);
  });
});

describe('status loading', () => {
  beforeEach(() => {
    useNotes().status = 'loading';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test('Should be render App', () => {
    const status = screen.getByText('loading');

    expect(status).toBeInTheDocument();
  });
});

describe('status failed', () => {
  beforeEach(() => {
    useNotes().status = 'failed';
    useNotes().message = 'Error';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test('Should be render App', () => {
    const status = screen.getByText('Error');

    expect(status).toBeInTheDocument();
  });
});
