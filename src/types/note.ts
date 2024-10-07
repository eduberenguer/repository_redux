export interface Note {
  id: string;
  content: string;
  important: boolean;
  createdAt: string;
}

export interface NewNote extends Omit<Note, 'id'> {}
