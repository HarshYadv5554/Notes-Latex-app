import express from "express";
import cors from "cors";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "./routes/notes";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Notes API routes
  app.get("/api/notes", getAllNotes);
  app.get("/api/notes/:id", getNoteById);
  app.post("/api/notes", createNote);
  app.put("/api/notes/:id", updateNote);
  app.delete("/api/notes/:id", deleteNote);

  return app;
}
