import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function Index() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="absolute left-0 right-0 top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">LaTeX Notes</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Building your notes app...
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <div className="w-80 border-r bg-muted/30">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Notes</h2>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </div>
          <div className="p-4">
            <Card className="cursor-pointer border-primary bg-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  Welcome to LaTeX Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                  This is your first note! Try writing some LaTeX...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Editor Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl font-bold mb-4">LaTeX Notes App</h2>
            <p className="text-lg mb-2">✅ Live LaTeX Rendering</p>
            <p className="text-lg mb-2">✅ Equation Toolbar</p>
            <p className="text-lg mb-2">✅ Note Management</p>
            <p className="text-lg mb-4">✅ Mathematical & Chemical Symbols</p>
            <div className="bg-muted p-4 rounded-lg max-w-md">
              <p className="text-sm">Loading full editor interface...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
