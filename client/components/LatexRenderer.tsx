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
      // Escape HTML first
      let processedContent = content.replace(/[&<>"']/g, (match) => {
        const htmlEscapes: Record<string, string> = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return htmlEscapes[match] || match;
      });

      // Handle display math ($$...$$) first
      processedContent = processedContent.replace(
        /\$\$(.*?)\$\$/gs,
        (match, latex) => {
          try {
            const rendered = katex.renderToString(latex.trim(), {
              displayMode: true,
              throwOnError: false,
            });
            return `<div class="katex-display-wrapper">${rendered}</div>`;
          } catch (e) {
            console.warn("LaTeX display math error:", e);
            return `<code class="latex-error">${match}</code>`;
          }
        },
      );

      // Handle inline math ($...$) - avoid matching display math
      processedContent = processedContent.replace(
        /(?<!\$)\$([^$\n]+?)\$(?!\$)/g,
        (match, latex) => {
          try {
            return katex.renderToString(latex.trim(), {
              displayMode: false,
              throwOnError: false,
            });
          } catch (e) {
            console.warn("LaTeX inline math error:", e);
            return `<code class="latex-error">${match}</code>`;
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
