import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, FileText, Trash2, Calendar } from "lucide-react";
import { Note } from "@shared/api";
import { formatDistanceToNow } from "date-fns";

interface NotesListProps {
  notes: Note[];
  selectedNoteId?: string;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
  onDeleteNote: (noteId: string) => void;
}

export function NotesList({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
}: NotesListProps) {
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteNoteId) {
      onDeleteNote(deleteNoteId);
      setDeleteNoteId(null);
    }
  };

  return (
    <div className="flex h-full flex-col border-r bg-muted/30">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Notes</h2>
        <Button onClick={onCreateNote} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {/* Notes List */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <FileText className="mb-2 h-8 w-8" />
              <p className="text-sm">No notes yet</p>
              <p className="text-xs">Create your first note to get started</p>
            </div>
          ) : (
            notes.map((note) => (
              <Card
                key={note._id}
                className={`cursor-pointer transition-colors hover:bg-accent ${
                  selectedNoteId === note._id
                    ? "border-primary bg-accent"
                    : "border-border"
                }`}
                onClick={() => onSelectNote(note)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-1 text-sm">
                      {note.title || "Untitled"}
                    </CardTitle>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteNoteId(note._id!);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Note</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "
                            {note.title || "Untitled"}"? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {note.content || "No content"}
                  </p>
                  <Separator className="my-2" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {formatDistanceToNow(new Date(note.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                    {note.content.includes("$") && (
                      <Badge variant="secondary" className="text-xs">
                        LaTeX
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
