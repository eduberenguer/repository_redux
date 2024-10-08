export interface Note {
  id: string;
  content: string;
  importance: boolean;
  createdAt: string;
}

export interface NewNote extends Omit<Note, 'id'> {}
