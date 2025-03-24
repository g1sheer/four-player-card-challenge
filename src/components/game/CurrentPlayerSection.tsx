
import React from 'react';
import PlayerHand from '@/components/PlayerHand';
import TreasureChest from '@/components/TreasureChest';
import { Player } from '@/utils/gameLogic';

interface CurrentPlayerSectionProps {
  currentPlayer: Player;
  showCards: boolean;
}

const CurrentPlayerSection: React.FC<CurrentPlayerSectionProps> = ({ 
  currentPlayer, 
  showCards 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column: Current player's cards */}
      <div className="lg:col-span-2">
        <div className="glass-panel p-4">
          <h3 className="text-lg font-semibold mb-4">Your Hand</h3>
          <PlayerHand
            player={currentPlayer}
            isCurrentPlayer={true}
            isPlayerTurn={true}
            cardsRevealed={showCards}
            enlarged={true}
          />
        </div>
      </div>
      
      {/* Right column: Treasure chest */}
      <div>
        <div className="glass-panel p-4 h-full">
          <h3 className="text-lg font-semibold mb-4">Your Treasure</h3>
          <TreasureChest chests={currentPlayer.treasureChests} />
        </div>
      </div>
    </div>
  );
};

export default CurrentPlayerSection;
