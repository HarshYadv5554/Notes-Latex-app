/**
 * Shared types between client and server for LaTeX Notes app
 */

/**
 * Note interface for the notes app
 */
export interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API response types
 */
export interface NotesResponse {
  notes: Note[];
}

export interface NoteResponse {
  note: Note;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
}
