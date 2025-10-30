import { Search, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'search', icon: Search, label: 'Qidiruv' },
    { id: 'history', icon: Clock, label: 'Tarix' },
    { id: 'favorites', icon: Heart, label: 'Sevimlilar' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around max-w-md mx-auto py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 h-auto py-2 px-6 hover:bg-transparent"
            >
              <Icon className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xs ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="h-1 w-12 bg-primary rounded-full mt-1" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
