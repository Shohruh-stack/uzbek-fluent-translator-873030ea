import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Heart } from "lucide-react";
import { toast } from "sonner";

interface TranslationCardProps {
  word: string;
  pronunciation: string;
  translation: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const TranslationCard = ({ 
  word, 
  pronunciation, 
  translation, 
  isFavorite,
  onToggleFavorite 
}: TranslationCardProps) => {
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      toast.error("Talaffuz funksiyasi qo'llab-quvvatlanmaydi");
    }
  };

  return (
    <Card className="p-6 rounded-[24px] shadow-lg bg-gradient-to-br from-card to-card/95">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-foreground mb-2">{word}</h2>
          <p className="text-muted-foreground text-sm">{pronunciation}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSpeak}
          className="rounded-full hover:bg-primary/10"
        >
          <Volume2 className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      
      <div className="mb-6">
        <p className="text-2xl font-semibold text-primary">{translation}</p>
      </div>
      
      <Button 
        variant="ghost"
        onClick={onToggleFavorite}
        className="w-full rounded-[20px] hover:bg-primary/5"
      >
        <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-primary text-primary' : 'text-primary'}`} />
        <span className="text-primary font-medium">
          {isFavorite ? "Sevimlilardan o'chirish" : "Sevimilarga qo'shish"}
        </span>
      </Button>
    </Card>
  );
};
