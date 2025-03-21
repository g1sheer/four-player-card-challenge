
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  GameState, 
  Player, 
  Rank, 
  Suit, 
  initializeGame, 
  makeGuess 
} from '@/utils/gameLogic';
import PlayerHand from './PlayerHand';
import GuessInterface from './GuessInterface';
import TreasureChest from './TreasureChest';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface GameBoardProps {
  onBack?: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showCards, setShowCards] = useState(false);

  // Initialize the game
  useEffect(() => {
    const newGameState = initializeGame();
    setGameState(newGameState);
  }, []);

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

  const handleNewGame = () => {
    const newGameState = initializeGame();
    setGameState(newGameState);
    setShowCards(false);
  };

  if (!gameState) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="game-board">
      <div className="container mx-auto p-4 pt-16 pb-16">
        {/* Header with Navigation and Controls */}
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
            {false && <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCards(!showCards)}
              className="flex items-center gap-1"
            >
              {showCards ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Hide Cards
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show Cards
                </>
              )}
            </Button>}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleNewGame}
            >
              New Game
            </Button>
          </div>
        </div>
        
        {/* Game Over Display */}
        {gameState.gameOver && gameState.winner !== null && (
          <div className="glass-panel p-6 text-center mb-8 animate-scale-in">
            <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
            <p className="text-xl">
              {gameState.players[gameState.winner].name} wins with {gameState.players[gameState.winner].treasureChests.length} treasure chests!
            </p>
            <Button 
              className="mt-4" 
              size="lg" 
              onClick={handleNewGame}
            >
              Play Again
            </Button>
          </div>
        )}
        
        {/* Main Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section: Opponents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Opponents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    onSelectPlayer={() => handleMakeGuess(player.id)}
                    selectedForGuess={gameState.selectedPlayerIndex === player.id}
                  />
                );
              })}
            </div>
            
            {/* Guessing Interface */}
            <div className="mt-8">
              {!gameState.gameOver && (
                <GuessInterface
                  gameState={gameState}
                  onMakeGuess={handleMakeGuess}
                  visible={true}
                />
              )}
            </div>
          </div>
          
          {/* Right Section: Current Player & Treasure Chests */}
          <div className="space-y-6">
            {/* Current Player */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Hand</h3>
              <PlayerHand
                player={currentPlayer}
                isCurrentPlayer={true}
                isPlayerTurn={true}
                cardsRevealed={showCards}
              />
            </div>
            
            {/* Treasure Chests */}
            <div className="h-64">
              <TreasureChest chests={currentPlayer.treasureChests} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
