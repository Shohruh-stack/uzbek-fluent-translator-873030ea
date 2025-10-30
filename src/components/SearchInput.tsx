import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const SearchInput = ({ value, onChange, onSubmit }: SearchInputProps) => {
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
    </div>
  );
};
