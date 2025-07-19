import { useEffect, useRef } from "react";
import katex from "katex";

interface LatexRendererProps {
  content: string;
  className?: string;
}

export function LatexRenderer({ content, className = "" }: LatexRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Process the content to render LaTeX
      let processedContent = content;

      // Handle display math ($$...$$)
      processedContent = processedContent.replace(
        /\$\$(.*?)\$\$/gs,
        (match, latex) => {
          try {
            return katex.renderToString(latex, {
              displayMode: true,
              throwOnError: false,
            });
          } catch (e) {
            return match;
          }
        },
      );

      // Handle inline math ($...$)
      processedContent = processedContent.replace(
        /\$([^$]*?)\$/g,
        (match, latex) => {
          try {
            return katex.renderToString(latex, {
              displayMode: false,
              throwOnError: false,
            });
          } catch (e) {
            return match;
          }
        },
      );

      // Convert line breaks to <br> tags
      processedContent = processedContent.replace(/\n/g, "<br>");

      containerRef.current.innerHTML = processedContent;
    } catch (error) {
      console.error("LaTeX rendering error:", error);
      if (containerRef.current) {
        containerRef.current.textContent = content;
      }
    }
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={`latex-content prose max-w-none ${className}`}
    />
  );
}
