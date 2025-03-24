
import React from 'react';
import PlayerHand from '@/components/PlayerHand';
import { GameState } from '@/utils/gameLogic';

interface OpponentsSectionProps {
  gameState: GameState;
  onSelectPlayer: (playerId: number) => void;
}

const OpponentsSection: React.FC<OpponentsSectionProps> = ({ 
  gameState, 
  onSelectPlayer 
}) => {
  return (
    <div className="glass-panel p-4">
      <h3 className="text-lg font-semibold mb-4">Opponents</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {gameState.players.map((player, index) => {
          // Skip current player as they're shown separately
          if (index === gameState.currentPlayerIndex) return null;
          
          return (
            <PlayerHand
              key={player.id}
              player={player}
              isCurrentPlayer={false}
              isPlayerTurn={gameState.currentPlayerIndex === index}
              cardsRevealed={false}
              onSelectPlayer={() => onSelectPlayer(player.id)}
              selectedForGuess={gameState.selectedPlayerIndex === player.id}
              compactView={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OpponentsSection;
