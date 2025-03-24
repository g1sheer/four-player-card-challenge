
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface GameHeaderProps {
  onBack?: () => void;
  onNewGame: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onBack, onNewGame }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onBack}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </Button>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onNewGame}
        >
          New Game
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
