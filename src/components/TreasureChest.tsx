
import React from 'react';
import { Rank, Suit } from '@/utils/gameLogic';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Heart, Diamond, Club, Spade, MapPin } from 'lucide-react';

interface TreasureChestProps {
  chests: { rank: Rank, suits: Suit[] }[];
}

/**
 * Component to display a player's collected treasure chests
 * @param chests Array of treasure chests (complete sets) collected by the player
 */
const TreasureChest: React.FC<TreasureChestProps> = ({ chests }) => {
  // Display placeholder when no chests are collected
  if (chests.length === 0) {
    return (
      <div className="glass-panel h-full p-4 flex flex-col items-center justify-center text-muted-foreground">
        <MapPin className="w-10 h-10 mb-2 opacity-30" />
        <p>No treasure chests yet</p>
      </div>
    );
  }

  /**
   * Renders the appropriate icon for each card suit
   * @param suit The suit to render an icon for
   */
  const SuitIcon = ({ suit }: { suit: Suit }) => {
    switch (suit) {
      case 'hearts': return <Heart className="w-4 h-4 text-hearts" />;
      case 'diamonds': return <Diamond className="w-4 h-4 text-diamonds" />;
      case 'clubs': return <Club className="w-4 h-4 text-clubs" />;
      case 'spades': return <Spade className="w-4 h-4 text-spades" />;
    }
  };

  return (
    <div className="glass-panel h-full p-4">
      {/* Treasure chest header */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold">Treasure Chests</h3>
      </div>
      
      {/* Scrollable area for treasure chests */}
      <ScrollArea className="h-[calc(100%-2rem)]">
        <div className="space-y-3">
          {chests.map((chest, index) => (
            <div 
              key={`${chest.rank}-${index}`}
              className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 shadow-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline" className="font-bold text-lg px-3">
                  {chest.rank}
                </Badge>
                <div className="flex gap-1">
                  {chest.suits.map((suit) => (
                    <div key={suit} className="w-6 h-6 flex items-center justify-center">
                      <SuitIcon suit={suit} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TreasureChest;
