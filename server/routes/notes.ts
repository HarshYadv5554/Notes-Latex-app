import { RequestHandler } from "express";
import mongoose from "mongoose";
import {
  Note,
  NotesResponse,
  NoteResponse,
  CreateNoteRequest,
  UpdateNoteRequest,
} from "@shared/api";

// MongoDB Schema
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const NoteModel = mongoose.model("Note", noteSchema);

// Connect to MongoDB (using in-memory for demo, replace with actual MongoDB URI)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    // For demo purposes, we'll use a simple in-memory approach
    // In production, replace with: await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connection established (demo mode)");
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// In-memory storage for demo (replace with actual MongoDB in production)
let notes: Note[] = [
  {
    _id: "1",
    title: "Welcome to LaTeX Notes",
    content:
      "This is your first note! Try writing some LaTeX: $$E = mc^2$$\n\nYou can also write inline math like $\\pi \\approx 3.14159$ or chemical formulas like $H_2O$.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
let nextId = 2;

// Get all notes
export const getAllNotes: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const response: NotesResponse = { notes };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// Get note by ID
export const getNoteById: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const note = notes.find((n) => n._id === id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const response: NoteResponse = { note };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
};

// Create new note
export const createNote: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const { title, content }: CreateNoteRequest = req.body;

    const newNote: Note = {
      _id: nextId.toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    notes.push(newNote);
    nextId++;

    const response: NoteResponse = { note: newNote };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

// Update note
export const updateNote: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const updates: UpdateNoteRequest = req.body;

    const noteIndex = notes.findIndex((n) => n._id === id);
    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      ...updates,
      updatedAt: new Date(),
    };

    const response: NoteResponse = { note: notes[noteIndex] };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

// Delete note
export const deleteNote: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;

    const noteIndex = notes.findIndex((n) => n._id === id);
    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    notes.splice(noteIndex, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
