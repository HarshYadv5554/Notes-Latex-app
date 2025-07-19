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
  content: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const NoteModel = mongoose.model("Note", noteSchema);

// MongoDB connection
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://harsh:mypassword@cluster0.e74piwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    );
    console.log("MongoDB connection established");
    isConnected = true;

    // Create a welcome note if no notes exist
    const noteCount = await NoteModel.countDocuments();
    if (noteCount === 0) {
      await NoteModel.create({
        title: "Welcome to LaTeX Notes",
        content:
          "This is your first note! Try writing some LaTeX: $$E = mc^2$$\n\nYou can also write inline math like $\\pi \\approx 3.14159$ or chemical formulas like $H_2O$.",
      });
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Get all notes
export const getAllNotes: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const mongoNotes = await NoteModel.find().sort({ updatedAt: -1 });
    const notes: Note[] = mongoNotes.map((note) => ({
      _id: note._id.toString(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }));
    const response: NotesResponse = { notes };
    res.json(response);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// Get note by ID
export const getNoteById: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const mongoNote = await NoteModel.findById(id);

    if (!mongoNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    const note: Note = {
      _id: mongoNote._id.toString(),
      title: mongoNote.title,
      content: mongoNote.content,
      createdAt: mongoNote.createdAt,
      updatedAt: mongoNote.updatedAt,
    };

    const response: NoteResponse = { note };
    res.json(response);
  } catch (error) {
    console.error("Failed to fetch note:", error);
    res.status(500).json({ error: "Failed to fetch note" });
  }
};

// Create new note
export const createNote: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const { title, content }: CreateNoteRequest = req.body;

    const mongoNote = await NoteModel.create({
      title,
      content,
    });

    const note: Note = {
      _id: mongoNote._id.toString(),
      title: mongoNote.title,
      content: mongoNote.content,
      createdAt: mongoNote.createdAt,
      updatedAt: mongoNote.updatedAt,
    };

    const response: NoteResponse = { note };
    res.status(201).json(response);
  } catch (error) {
    console.error("Failed to create note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
};

// Update note
export const updateNote: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const updates: UpdateNoteRequest = req.body;

    const mongoNote = await NoteModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true },
    );

    if (!mongoNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    const note: Note = {
      _id: mongoNote._id.toString(),
      title: mongoNote.title,
      content: mongoNote.content,
      createdAt: mongoNote.createdAt,
      updatedAt: mongoNote.updatedAt,
    };

    const response: NoteResponse = { note };
    res.json(response);
  } catch (error) {
    console.error("Failed to update note:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
};

// Delete note
export const deleteNote: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;

    const deletedNote = await NoteModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};
