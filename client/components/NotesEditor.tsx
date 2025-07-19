import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Save, Eye, Edit3 } from "lucide-react";
import { LatexRenderer } from "./LatexRenderer";
import { EquationToolbar } from "./EquationToolbar";
import { Note } from "@shared/api";

interface NotesEditorProps {
  note?: Note;
  onSave: (title: string, content: string) => void;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
}

export function NotesEditor({
  note,
  onSave,
  onTitleChange,
  onContentChange,
}: NotesEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onContentChange?.(newContent);
  };

  const handleSave = () => {
    onSave(title, content);
  };

  const insertSymbol = useCallback(
    (latex: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        content.substring(0, start) + `$${latex}$` + content.substring(end);

      handleContentChange(newContent);

      // Move cursor to end of inserted content
      setTimeout(() => {
        const newPosition = start + latex.length + 2;
        textarea.setSelectionRange(newPosition, newPosition);
        textarea.focus();
      }, 0);
    },
    [content, handleContentChange],
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 border-b p-4">
        <div className="flex-1">
          <Input
            placeholder="Note title..."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-lg font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isPreviewMode ? "outline" : "default"}
            size="sm"
            onClick={() => setIsPreviewMode(false)}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant={isPreviewMode ? "default" : "outline"}
            size="sm"
            onClick={() => setIsPreviewMode(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Equation Toolbar */}
      {!isPreviewMode && (
        <ScrollArea className="max-h-64">
          <EquationToolbar onInsertSymbol={insertSymbol} />
        </ScrollArea>
      )}

      {/* Editor/Preview */}
      <div className="flex flex-1 overflow-hidden">
        {isPreviewMode ? (
          <div className="flex-1 overflow-auto">
            <Card className="m-4 h-fit">
              <CardHeader>
                <CardTitle>{title || "Untitled Note"}</CardTitle>
              </CardHeader>
              <CardContent>
                <LatexRenderer content={content} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex flex-1 gap-4 p-4">
            {/* Editor */}
            <div className="flex-1">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-sm">Editor</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 min-h-0">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Start writing your note... Use $...$ for inline math or $$...$$ for display math."
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="h-full w-full resize-none border-0 text-sm font-mono focus-visible:ring-0"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Live Preview */}
            <div className="flex-1">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-sm">Live Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto min-h-0 p-4">
                  <LatexRenderer content={content} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
