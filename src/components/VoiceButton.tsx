import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { toast } from "sonner";

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
}

export const VoiceButton = ({ onTranscript }: VoiceButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Brauzeringiz ovozli tanib olishni qo'llab-quvvatlamaydi");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
      toast.info("Ovozli qidiruv boshlandi. So'zni ayting...");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript.toLowerCase().trim());
      toast.success(`Aytilgan: "${transcript}"`);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      toast.error("Ovozni tanib bo'lmadi. Qayta urinib ko'ring.");
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      toast.info("Ovozli qidiruv to'xtatildi");
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className={`h-40 w-40 rounded-full shadow-xl transition-all hover:scale-105 ${
        isRecording 
          ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
          : 'bg-card hover:bg-card/90'
      }`}
    >
      {isRecording ? (
        <Square className="h-20 w-20 text-white fill-white" />
      ) : (
        <Mic className="h-20 w-20 text-accent" />
      )}
    </Button>
  );
};
