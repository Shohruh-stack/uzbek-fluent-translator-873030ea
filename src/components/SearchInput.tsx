import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

export const SearchInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  suggestions,
  onSelectSuggestion 
}: SearchInputProps) => {
  const showSuggestions = value.length > 0 && suggestions.length > 0;

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        placeholder="So'z yoki iborani kiriting..."
        className="h-14 pl-6 pr-14 rounded-[24px] bg-card shadow-md border-0 text-base"
      />
      <button 
        onClick={onSubmit}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
      >
        <Search className="h-6 w-6" />
      </button>
      
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-[20px] shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
              className="w-full px-6 py-3 text-left hover:bg-primary/10 transition-colors text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
