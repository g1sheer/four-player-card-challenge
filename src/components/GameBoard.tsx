
import React, { useState, useEffect } from 'react';
import { 
  GameState, 
  Rank, 
  Suit, 
  initializeGame, 
  makeGuess 
} from '@/utils/gameLogic';
import GuessInterface from './GuessInterface';
import { toast } from '@/components/ui/use-toast';
import GameHeader from './game/GameHeader';
import GameOverPanel from './game/GameOverPanel';
import CurrentPlayerSection from './game/CurrentPlayerSection';
import OpponentsSection from './game/OpponentsSection';

interface GameBoardProps {
  onBack?: () => void;
}

/**
 * The main game board component that orchestrates the entire game
 * @param onBack Optional callback function to navigate back to menu
 */
const GameBoard: React.FC<GameBoardProps> = ({ onBack }) => {
  // State to track the current game state
  const [gameState, setGameState] = useState<GameState | null>(null);
  // State to toggle visibility of current player's cards
  const [showCards, setShowCards] = useState(false);

  /**
   * Initialize the game when component mounts
   */
  useEffect(() => {
    const newGameState = initializeGame();
    setGameState(newGameState);
  }, []);

  /**
   * Handles player guesses and updates the game state
   * @param targetPlayerId The player being guessed from
   * @param rank The rank being guessed
   * @param quantity The quantity of cards being guessed
   * @param suits The suits being guessed
   */
  const handleMakeGuess = (
    targetPlayerId?: number | null,
    rank?: Rank | null,
    quantity?: number | null,
    suits?: Suit[] | null
  ) => {
    if (!gameState) return;
    
    const newState = makeGuess(gameState, targetPlayerId, rank, quantity, suits);
    setGameState(newState);
    
    // Show a notification for correct/incorrect guesses
    if (newState.lastGuessCorrect !== null) {
      if (newState.lastGuessCorrect) {
        toast({
          title: "Correct Guess!",
          description: "You've taken the cards and added them to your hand.",
          variant: "default",
          className: "bg-green-500 text-white"
        });
      } else {
        toast({
          title: "Incorrect Guess",
          description: "Your guess was wrong. Next player's turn.",
          variant: "destructive"
        });
      }
    }
    
    // Show a notification for new treasure chests
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const newCurrentPlayer = newState.players[newState.currentPlayerIndex];
    
    if (newCurrentPlayer.treasureChests.length > currentPlayer.treasureChests.length) {
      toast({
        title: "Treasure Chest Created!",
        description: "You've formed a complete set and added it to your treasure chest!",
        variant: "default",
        className: "bg-amber-500 text-white"
      });
    }
    
    // Show a notification when the game is over
    if (newState.gameOver && newState.winner !== null) {
      toast({
        title: "Game Over!",
        description: `${newState.players[newState.winner].name} wins with ${newState.players[newState.winner].treasureChests.length} treasure chests!`,
        variant: "default",
        className: "bg-blue-500 text-white"
      });
    }
  };

  /**
   * Starts a new game
   */
  const handleNewGame = () => {
    const newGameState = initializeGame();
    setGameState(newGameState);
    setShowCards(false);
  };

  /**
   * Handles selection of a player for guessing
   * @param playerId ID of the selected player
   */
  const handleSelectPlayer = (playerId: number) => {
    handleMakeGuess(playerId);
  };

  if (!gameState) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="game-board">
      {/* Main container with responsive padding and maximum width */}
      <div className="container mx-auto p-4 pt-16 pb-16 max-w-7xl">
        {/* Header with Navigation and Controls */}
        <GameHeader onBack={onBack} onNewGame={handleNewGame} />
        
        {/* Game Over Display */}
        <GameOverPanel gameState={gameState} onNewGame={handleNewGame} />
        
        {/* Game layout with player content first */}
        <div className="flex flex-col space-y-6">
          {/* Current player zone */}
          <CurrentPlayerSection 
            currentPlayer={currentPlayer} 
            showCards={showCards} 
          />
          
          {/* Guessing interface - under player's cards */}
          {!gameState.gameOver && (
            <div className="mt-4">
              <GuessInterface
                gameState={gameState}
                onMakeGuess={handleMakeGuess}
                visible={true}
              />
            </div>
          )}
          
          {/* Opponents section - below player's content */}
          <OpponentsSection 
            gameState={gameState} 
            onSelectPlayer={handleSelectPlayer} 
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
