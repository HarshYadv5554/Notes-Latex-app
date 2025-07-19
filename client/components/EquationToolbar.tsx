import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EquationToolbarProps {
  onInsertSymbol: (latex: string) => void;
}

interface Symbol {
  label: string;
  latex: string;
  category: string;
}

const SYMBOLS: Symbol[] = [
  // Basic Math
  { label: "π", latex: "\\pi", category: "Basic" },
  { label: "∞", latex: "\\infty", category: "Basic" },
  { label: "√", latex: "\\sqrt{}", category: "Basic" },
  { label: "∛", latex: "\\sqrt[3]{}", category: "Basic" },
  { label: "±", latex: "\\pm", category: "Basic" },
  { label: "∓", latex: "\\mp", category: "Basic" },

  // Greek Letters
  { label: "α", latex: "\\alpha", category: "Greek" },
  { label: "β", latex: "\\beta", category: "Greek" },
  { label: "γ", latex: "\\gamma", category: "Greek" },
  { label: "δ", latex: "\\delta", category: "Greek" },
  { label: "θ", latex: "\\theta", category: "Greek" },
  { label: "λ", latex: "\\lambda", category: "Greek" },
  { label: "μ", latex: "\\mu", category: "Greek" },
  { label: "σ", latex: "\\sigma", category: "Greek" },
  { label: "φ", latex: "\\phi", category: "Greek" },
  { label: "ω", latex: "\\omega", category: "Greek" },

  // Operators
  { label: "∑", latex: "\\sum_{i=1}^{n}", category: "Operators" },
  { label: "∏", latex: "\\prod_{i=1}^{n}", category: "Operators" },
  { label: "∫", latex: "\\int", category: "Operators" },
  { label: "∮", latex: "\\oint", category: "Operators" },
  { label: "∂", latex: "\\partial", category: "Operators" },
  { label: "∇", latex: "\\nabla", category: "Operators" },

  // Relations
  { label: "≤", latex: "\\leq", category: "Relations" },
  { label: "≥", latex: "\\geq", category: "Relations" },
  { label: "≠", latex: "\\neq", category: "Relations" },
  { label: "≈", latex: "\\approx", category: "Relations" },
  { label: "≡", latex: "\\equiv", category: "Relations" },
  { label: "∈", latex: "\\in", category: "Relations" },
  { label: "∉", latex: "\\notin", category: "Relations" },
  { label: "⊂", latex: "\\subset", category: "Relations" },
  { label: "⊃", latex: "\\supset", category: "Relations" },

  // Arrows
  { label: "→", latex: "\\to", category: "Arrows" },
  { label: "←", latex: "\\leftarrow", category: "Arrows" },
  { label: "↔", latex: "\\leftrightarrow", category: "Arrows" },
  { label: "⇒", latex: "\\Rightarrow", category: "Arrows" },
  { label: "⇐", latex: "\\Leftarrow", category: "Arrows" },
  { label: "⇔", latex: "\\Leftrightarrow", category: "Arrows" },

  // Fractions & Powers
  { label: "x²", latex: "x^{2}", category: "Powers" },
  { label: "x^n", latex: "x^{n}", category: "Powers" },
  { label: "x₁", latex: "x_{1}", category: "Powers" },
  { label: "a/b", latex: "\\frac{a}{b}", category: "Powers" },

  // Matrices
  {
    label: "Matrix",
    latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
    category: "Matrix",
  },
  {
    label: "Vector",
    latex: "\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}",
    category: "Matrix",
  },

  // Chemistry
  { label: "H₂O", latex: "H_2O", category: "Chemistry" },
  { label: "CO₂", latex: "CO_2", category: "Chemistry" },
  { label: "NH₃", latex: "NH_3", category: "Chemistry" },
  { label: "CH₄", latex: "CH_4", category: "Chemistry" },
  { label: "→", latex: "\\to", category: "Chemistry" },
  { label: "⇌", latex: "\\rightleftharpoons", category: "Chemistry" },
];

const CATEGORIES = [
  "Basic",
  "Greek",
  "Operators",
  "Relations",
  "Arrows",
  "Powers",
  "Matrix",
  "Chemistry",
];

export function EquationToolbar({ onInsertSymbol }: EquationToolbarProps) {
  return (
    <div className="w-full border-b bg-background p-4">
      <div className="space-y-4">
        {CATEGORIES.map((category) => {
          const categorySymbols = SYMBOLS.filter(
            (symbol) => symbol.category === category,
          );
          if (categorySymbols.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {category}
              </h4>
              <div className="flex flex-wrap gap-1">
                {categorySymbols.map((symbol) => (
                  <Tooltip key={symbol.latex}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-sm"
                        onClick={() => onInsertSymbol(symbol.latex)}
                      >
                        {symbol.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-mono text-xs">{symbol.latex}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
