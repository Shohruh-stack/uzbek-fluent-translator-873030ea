import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";

interface LanguageSelectorProps {
  fromLang: string;
  toLang: string;
  onSwap: () => void;
}

export const LanguageSelector = ({ fromLang, toLang, onSwap }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-card p-4 rounded-[24px] shadow-md">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🇬🇧</span>
        <span className="font-semibold text-foreground">{fromLang}</span>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onSwap}
        className="rounded-full hover:bg-primary/10"
      >
        <ArrowLeftRight className="h-5 w-5 text-primary" />
      </Button>
      
      <div className="flex items-center gap-3">
        <span className="text-3xl">🇺🇿</span>
        <span className="font-semibold text-foreground">{toLang}</span>
      </div>
    </div>
  );
};
