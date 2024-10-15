import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { NoteForm } from './note.form';

describe('NoteForm', () => {
  const createNote = jest.fn();

  beforeEach(() => {
    render(<NoteForm createNote={createNote} />);
  });

  test('should render correctly', () => {
    expect(screen.getByText('Note')).toBeInTheDocument();
  });

  test('should render test note', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test note' } });

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test note');
  });

  test('should call createNote', () => {
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(createNote).toHaveBeenCalledTimes(1);
  });
});
