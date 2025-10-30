import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { toast } from "sonner";

export const VoiceButton = () => {
  const handleVoiceInput = () => {
    toast.info("Ovozli kiritish funksiyasi tez orada qo'shiladi");
  };

  return (
    <Button
      onClick={handleVoiceInput}
      size="icon"
      className="h-32 w-32 rounded-full bg-card hover:bg-card/90 shadow-xl transition-all hover:scale-105"
    >
      <Mic className="h-16 w-16 text-accent" />
    </Button>
  );
};
