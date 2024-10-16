import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { Note } from '../types/note';
import { Provider, useDispatch } from 'react-redux';
import store from '../store/store';
import { useNotes } from './use.notes';

jest.mock('../config', () => ({
  url: '',
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockNote = {
  id: 1,
  content: 'post',
  importance: false,
  createdAt: '2021-09-01',
} as unknown as Note;

function TestComponent() {
  const { createNote, changeImportance, removeNote } = useNotes();

  return (
    <>
      <button onClick={() => createNote(mockNote)}></button>
      <button onClick={() => changeImportance('1')}></button>
      <button onClick={() => removeNote('1')}></button>
    </>
  );
}

describe('useNotes', () => {
  let elements: HTMLElement[];

  beforeEach(async () => {
    await act(() =>
      render(
        <Provider store={store}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
    elements = screen.getAllByRole('button');
  });

  describe('When is rendered', () => {
    test('Then the loadNote function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[0]);

        expect(useDispatch()).toHaveBeenCalled();
      });
    });

    test('Then the createNote function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[1]);

        expect(useDispatch()).toHaveBeenCalled();
      });
    });

    test('Then the changeImportance function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[2]);

        expect(useDispatch()).toHaveBeenCalled();
      });
    });
  });
});
