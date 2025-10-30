import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceButton } from "@/components/VoiceButton";
import { SearchInput } from "@/components/SearchInput";
import { TranslationCard } from "@/components/TranslationCard";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";

interface Translation {
  word: string;
  pronunciation: string;
  translation: string;
  timestamp: number;
}

const Index = () => {
  const [fromLang, setFromLang] = useState("Inglizcha");
  const [toLang, setToLang] = useState("O'zbekcha");
  const [searchText, setSearchText] = useState("");
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);
  const [activeTab, setActiveTab] = useState("search");
  const [favorites, setFavorites] = useState<Translation[]>([]);
  const [history, setHistory] = useState<Translation[]>([]);

  // Load favorites and history from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const savedHistory = localStorage.getItem("history");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleSwapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setSearchText("");
    setCurrentTranslation(null);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      toast.error("Iltimos, so'z kiriting");
      return;
    }

    // Simple mock translation for demo
    const isEnglishToUzbek = fromLang === "Inglizcha";
    const mockTranslation: Translation = {
      word: searchText,
      pronunciation: isEnglishToUzbek ? `/${searchText.toLowerCase()}/` : "-",
      translation: isEnglishToUzbek 
        ? searchText + "ning tarjimasi" 
        : "translation of " + searchText,
      timestamp: Date.now(),
    };

    setCurrentTranslation(mockTranslation);
    
    // Add to history
    const newHistory = [mockTranslation, ...history.filter(h => h.word !== searchText)].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));

    toast.success("Tarjima topildi!");
  };

  const handleToggleFavorite = () => {
    if (!currentTranslation) return;

    const isFavorite = favorites.some(f => f.word === currentTranslation.word);
    let newFavorites: Translation[];
    
    if (isFavorite) {
      newFavorites = favorites.filter(f => f.word !== currentTranslation.word);
      toast.success("Sevimlilardan o'chirildi");
    } else {
      newFavorites = [currentTranslation, ...favorites];
      toast.success("Sevimlilarga qo'shildi!");
    }
    
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const isFavorite = currentTranslation 
    ? favorites.some(f => f.word === currentTranslation.word)
    : false;

  const renderContent = () => {
    if (activeTab === "history") {
      return (
        <div className="space-y-4 pb-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tarix</h2>
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Hali tarix yo'q</p>
          ) : (
            history.map((item, index) => (
              <div 
                key={index}
                onClick={() => {
                  setCurrentTranslation(item);
                  setSearchText(item.word);
                  setActiveTab("search");
                }}
                className="bg-card p-4 rounded-[20px] shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-foreground">{item.word}</p>
                <p className="text-primary">{item.translation}</p>
              </div>
            ))
          )}
        </div>
      );
    }

    if (activeTab === "favorites") {
      return (
        <div className="space-y-4 pb-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">Sevimlilar</h2>
          {favorites.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Hali sevimli so'zlar yo'q</p>
          ) : (
            favorites.map((item, index) => (
              <div 
                key={index}
                onClick={() => {
                  setCurrentTranslation(item);
                  setSearchText(item.word);
                  setActiveTab("search");
                }}
                className="bg-card p-4 rounded-[20px] shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-foreground">{item.word}</p>
                <p className="text-primary">{item.translation}</p>
              </div>
            ))
          )}
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-center mb-12">
          <VoiceButton />
        </div>

        <SearchInput 
          value={searchText}
          onChange={setSearchText}
          onSubmit={handleSearch}
        />

        {currentTranslation && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TranslationCard 
              word={currentTranslation.word}
              pronunciation={currentTranslation.pronunciation}
              translation={currentTranslation.translation}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-primary/90 pb-20">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <h1 className="text-xl font-bold text-white">Onilme</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Settings className="h-6 w-6" />
          </Button>
        </div>

        {/* Language Selector */}
        <div className="mb-12">
          <LanguageSelector 
            fromLang={fromLang}
            toLang={toLang}
            onSwap={handleSwapLanguages}
          />
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
