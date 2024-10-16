import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { DetailNote } from './detail.note';

describe('Detail note', () => {
  const mockNote = {
    id: '1',
    content: 'This is a new note',
    createdAt: '2024-10-15T14:44:20.076Z',
    importance: false,
  };

  const changeImportance = jest.fn();
  const removeNote = jest.fn();

  beforeEach(() => {
    render(
      <DetailNote
        note={mockNote}
        changeImportance={changeImportance}
        removeNote={removeNote}
      />
    );
  });

  test('should render detail note', () => {
    const contentNote = screen.getByText(/This is a new note/i);

    expect(contentNote).toBeInTheDocument();
  });

  test('should change importance function call', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(changeImportance).toHaveBeenCalled();
  });

  test('should remove note function call', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(removeNote).toHaveBeenCalled();
  });
});
