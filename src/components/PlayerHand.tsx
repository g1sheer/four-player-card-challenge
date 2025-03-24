
import React from 'react';
import Card from './Card';
import { Card as CardType, Player } from '@/utils/gameLogic';
import { Badge } from '@/components/ui/badge';
import { User, Star } from 'lucide-react';

interface PlayerHandProps {
  player: Player;
  isCurrentPlayer: boolean;
  isPlayerTurn: boolean;
  cardsRevealed?: boolean;
  onSelectPlayer?: () => void;
  selectedForGuess?: boolean;
  compactView?: boolean;
  enlarged?: boolean;
}

/**
 * Component to display a player's hand of cards
 * @param player The player whose cards to display
 * @param isCurrentPlayer Whether this is the current player
 * @param isPlayerTurn Whether it's this player's turn
 * @param cardsRevealed Whether cards should be shown face-up
 * @param onSelectPlayer Callback when player is selected for guessing
 * @param selectedForGuess Whether this player is currently selected for guessing
 * @param compactView Whether to show cards in a compact layout
 * @param enlarged Whether to show cards in a larger size
 */
const PlayerHand: React.FC<PlayerHandProps> = ({
  player,
  isCurrentPlayer,
  isPlayerTurn,
  cardsRevealed = false,
  onSelectPlayer,
  selectedForGuess = false,
  compactView = false,
  enlarged = false
}) => {
  /**
   * Sorts cards by rank and suit for better presentation
   */
  const sortedCards = [...player.cards].sort((a, b) => {
    // Sort by rank
    const rankOrder: Record<string, number> = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
      'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    
    if (rankOrder[a.rank] !== rankOrder[b.rank]) {
      return rankOrder[a.rank] - rankOrder[b.rank];
    }
    
    // Then by suit
    const suitOrder: Record<string, number> = {
      'hearts': 1, 'diamonds': 2, 'clubs': 3, 'spades': 4
    };
    
    return suitOrder[a.suit] - suitOrder[b.suit];
  });

  /**
   * Handles clicking on a player to select them for guessing
   */
  const handleSelectPlayer = () => {
    if (!isCurrentPlayer && isPlayerTurn && onSelectPlayer) {
      onSelectPlayer();
    }
  };

  // Classes for different display types
  const containerClasses = `
    glass-panel p-4 transition-all duration-300 
    ${selectedForGuess ? 'ring-2 ring-primary' : ''} 
    ${isPlayerTurn && !isCurrentPlayer ? 'cursor-pointer hover:ring-2 hover:ring-primary/50' : ''} 
    ${isCurrentPlayer ? 'bg-blue-50/90 dark:bg-blue-900/20' : 'bg-white/80 dark:bg-gray-900/80'}
    ${compactView ? 'h-auto' : 'h-full'}
  `;

  return (
    <div 
      className={containerClasses}
      onClick={handleSelectPlayer}
    >
      {/* Player info header with name and treasure count */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${isCurrentPlayer ? 'bg-primary text-white' : 'bg-secondary'}`}>
            <User size={compactView ? 16 : 18} />
          </div>
          <div className={`font-medium ${compactView ? 'text-base' : 'text-lg'}`}>{player.name}</div>
          {isPlayerTurn && (
            <Badge variant="outline" className="bg-primary/10 text-primary animate-pulse-subtle">
              Current Turn
            </Badge>
          )}
        </div>
        <Badge className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600">
          <Star size={14} className="text-yellow-100" /> 
          <span>{player.treasureChests.length}</span>
        </Badge>
      </div>
      
      {/* Cards display area */}
      {player.cards.length > 0 ? (
        <div className="relative">
          <div className={`
            flex ${compactView ? 'flex-wrap justify-center gap-1' : 'flex-wrap gap-2'}
            ${enlarged ? 'justify-center md:justify-start' : ''}
          `}>
            {sortedCards.map((card, index) => (
              <Card 
                key={card.id} 
                card={card} 
                revealed={isCurrentPlayer ? cardsRevealed : true}
                animationDelay={index * 50}
                size={compactView ? 'small' : enlarged ? 'large' : 'medium'}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={`${compactView ? 'h-16' : 'h-28'} flex items-center justify-center text-muted-foreground`}>
          No cards
        </div>
      )}
    </div>
  );
};

export default PlayerHand;
