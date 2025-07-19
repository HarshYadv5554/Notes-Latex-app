import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { NotesEditor } from "@/components/NotesEditor";
import { NotesList } from "@/components/NotesList";
import {
  Note,
  NotesResponse,
  NoteResponse,
  CreateNoteRequest,
  UpdateNoteRequest,
} from "@shared/api";

export default function Index() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const queryClient = useQueryClient();

  // Fetch all notes
  const {
    data: notesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async (): Promise<NotesResponse> => {
      console.log("Fetching notes...");
      const response = await fetch("/api/notes");
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched notes:", data);
      return data;
    },
    staleTime: 0,
    gcTime: 0,
  });

  // Create note mutation
  const createNoteMutation = useMutation({
    mutationFn: async (noteData: CreateNoteRequest): Promise<NoteResponse> => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) {
        throw new Error("Failed to create note");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(data.note);
      setEditingTitle(data.note.title);
      setEditingContent(data.note.content);
      setHasUnsavedChanges(false);
      toast({
        title: "Success",
        description: "Note created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    },
  });

  // Update note mutation
  const updateNoteMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateNoteRequest;
    }): Promise<NoteResponse> => {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(data.note);
      setHasUnsavedChanges(false);
      toast({
        title: "Success",
        description: "Note saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      });
    },
  });

  // Delete note mutation
  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(null);
      setEditingTitle("");
      setEditingContent("");
      setHasUnsavedChanges(false);
      toast({
        title: "Success",
        description: "Note deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    },
  });

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setEditingTitle(note.title);
    setEditingContent(note.content);
    setHasUnsavedChanges(false);
  };

  const handleCreateNote = () => {
    createNoteMutation.mutate({
      title: "New Note",
      content: "Start writing your note here...\n\nTry some LaTeX: $E = mc^2$",
    });
  };

  const handleSave = (title: string, content: string) => {
    if (!selectedNote) return;

    updateNoteMutation.mutate({
      id: selectedNote._id!,
      updates: { title, content },
    });
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  const handleTitleChange = (title: string) => {
    setEditingTitle(title);
    setHasUnsavedChanges(
      title !== selectedNote?.title || editingContent !== selectedNote?.content,
    );
  };

  const handleContentChange = (content: string) => {
    setEditingContent(content);
    setHasUnsavedChanges(
      editingTitle !== selectedNote?.title || content !== selectedNote?.content,
    );
  };

  // Auto-select first note if none selected
  useEffect(() => {
    if (
      !selectedNote &&
      notesData?.notes &&
      notesData.notes.length > 0 &&
      !createNoteMutation.isPending
    ) {
      handleSelectNote(notesData.notes[0]);
    }
  }, [notesData, selectedNote, createNoteMutation.isPending]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Error</h1>
          <p className="text-muted-foreground">Failed to load notes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="absolute left-0 right-0 top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">LaTeX Notes</h1>
            {hasUnsavedChanges && (
              <span className="text-xs text-muted-foreground">
                • Unsaved changes
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {notesData?.notes.length || 0} note
            {notesData?.notes.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <div className="w-80">
          <NotesList
            notes={notesData?.notes || []}
            selectedNoteId={selectedNote?._id}
            onSelectNote={handleSelectNote}
            onCreateNote={handleCreateNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>

        {/* Editor */}
        <div className="flex-1">
          {selectedNote ? (
            <NotesEditor
              key={selectedNote._id}
              note={{
                ...selectedNote,
                title: editingTitle,
                content: editingContent,
              }}
              onSave={handleSave}
              onTitleChange={handleTitleChange}
              onContentChange={handleContentChange}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-muted-foreground">
                <h2 className="text-2xl font-bold mb-4">LaTeX Notes App</h2>
                <p className="text-lg mb-2">✅ Live LaTeX Rendering</p>
                <p className="text-lg mb-2">✅ Equation Toolbar</p>
                <p className="text-lg mb-2">✅ Note Management</p>
                <p className="text-lg mb-4">
                  ✅ Mathematical & Chemical Symbols
                </p>
                <div className="bg-muted p-4 rounded-lg max-w-md">
                  <p className="text-sm">
                    Create a new note to start writing with LaTeX support
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center">
            <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading notes...</p>
          </div>
        </div>
      )}
    </div>
  );
}
