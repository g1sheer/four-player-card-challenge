
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameState } from '@/utils/gameLogic';

interface GameOverPanelProps {
  gameState: GameState;
  onNewGame: () => void;
}

/**
 * Component to display game results when the game is over
 * @param gameState Current game state
 * @param onNewGame Callback to start a new game
 */
const GameOverPanel: React.FC<GameOverPanelProps> = ({ gameState, onNewGame }) => {
  // Only render when game is over and there's a winner
  if (!gameState.gameOver || gameState.winner === null) return null;
  
  return (
    <div className="glass-panel p-6 text-center mb-8 animate-scale-in">
      <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
      <p className="text-xl">
        {gameState.players[gameState.winner].name} wins with {gameState.players[gameState.winner].treasureChests.length} treasure chests!
      </p>
      <Button 
        className="mt-4" 
        size="lg" 
        onClick={onNewGame}
      >
        Play Again
      </Button>
    </div>
  );
};

export default GameOverPanel;
