
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RANKS, SUITS, Rank, Suit, GameState } from '@/utils/gameLogic';
import { Check, X, Heart, Diamond, Club, Spade } from 'lucide-react';

interface GuessInterfaceProps {
  gameState: GameState;
  onMakeGuess: (
    targetPlayerId?: number | null,
    rank?: Rank | null,
    quantity?: number | null,
    suit?: Suit | null
  ) => void;
  visible: boolean;
}

const GuessInterface: React.FC<GuessInterfaceProps> = ({
  gameState,
  onMakeGuess,
  visible
}) => {
  if (!visible) return null;

  const renderPlayerSelection = () => {
    const otherPlayers = gameState.players.filter((_, index) => index !== gameState.currentPlayerIndex);
    
    return (
      <div className="space-y-4 animate-slide-up">
        <CardTitle>Select a Player</CardTitle>
        <CardDescription>Choose a player to guess their cards</CardDescription>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {otherPlayers.map((player) => (
            <Button
              key={player.id}
              variant="outline"
              className="text-left justify-start h-auto py-3"
              onClick={() => onMakeGuess(player.id)}
            >
              {player.name}
              <span className="ml-auto text-xs text-muted-foreground">
                {player.cards.length} cards
              </span>
            </Button>
          ))}
        </div>
      </div>
    );
  };
  
  const renderRankSelection = () => {
    return (
      <div className="space-y-4 animate-slide-up">
        <CardTitle>Guess a Rank</CardTitle>
        <CardDescription>
          Which rank do you think 
          {gameState.selectedPlayerIndex !== null && (
            <span className="font-medium"> {gameState.players[gameState.selectedPlayerIndex].name} </span>
          )}
          has?
        </CardDescription>
        
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {RANKS.map((rank) => (
            <Button
              key={rank}
              variant="outline"
              className="h-14 text-lg font-bold"
              onClick={() => onMakeGuess(null, rank)}
            >
              {rank}
            </Button>
          ))}
        </div>
      </div>
    );
  };
  
  const renderQuantitySelection = () => {
    return (
      <div className="space-y-4 animate-slide-up">
        <CardTitle>Guess Quantity</CardTitle>
        <CardDescription>
          How many
          {gameState.guessedRank && (
            <span className="font-medium"> {gameState.guessedRank}'s </span>
          )}
          do you think
          {gameState.selectedPlayerIndex !== null && (
            <span className="font-medium"> {gameState.players[gameState.selectedPlayerIndex].name} </span>
          )}
          has?
        </CardDescription>
        
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4].map((quantity) => (
            <Button
              key={quantity}
              variant="outline"
              className="h-14 w-14 text-lg font-bold"
              onClick={() => onMakeGuess(null, null, quantity)}
            >
              {quantity}
            </Button>
          ))}
        </div>
      </div>
    );
  };
  
  const renderSuitSelection = () => {
    const SuitIcon = ({ suit }: { suit: Suit }) => {
      switch (suit) {
        case 'hearts': return <Heart className="w-5 h-5 text-hearts" />;
        case 'diamonds': return <Diamond className="w-5 h-5 text-diamonds" />;
        case 'clubs': return <Club className="w-5 h-5 text-clubs" />;
        case 'spades': return <Spade className="w-5 h-5 text-spades" />;
      }
    };
    
    return (
      <div className="space-y-4 animate-slide-up">
        <CardTitle>Guess a Suit</CardTitle>
        <CardDescription>
          Which suit of
          {gameState.guessedRank && (
            <span className="font-medium"> {gameState.guessedRank} </span>
          )}
          do you think
          {gameState.selectedPlayerIndex !== null && (
            <span className="font-medium"> {gameState.players[gameState.selectedPlayerIndex].name} </span>
          )}
          has?
        </CardDescription>
        
        <div className="flex justify-center gap-3">
          {SUITS.map((suit) => (
            <Button
              key={suit}
              variant="outline"
              className="h-14 w-20 flex items-center justify-center gap-2"
              onClick={() => onMakeGuess(null, null, null, suit)}
            >
              <SuitIcon suit={suit} />
              <span className="capitalize">{suit}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };
  
  const renderGuessResult = () => {
    const isCorrect = gameState.lastGuessCorrect;
    
    return (
      <div className={`space-y-4 animate-slide-up text-center ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
        <div className="flex justify-center">
          {isCorrect ? (
            <Check className="w-16 h-16" />
          ) : (
            <X className="w-16 h-16" />
          )}
        </div>
        
        <CardTitle>{isCorrect ? 'Correct Guess!' : 'Incorrect Guess'}</CardTitle>
        
        <div>
          {isCorrect ? (
            <p>You guessed correctly and took the cards!</p>
          ) : (
            <p>Your guess was wrong. Next player's turn.</p>
          )}
        </div>
        
        <Button
          className="mt-4"
          onClick={() => onMakeGuess()}
        >
          Continue
        </Button>
      </div>
    );
  };
  
  // Render the appropriate interface based on the current guess stage
  const renderGuessStage = () => {
    switch (gameState.guessStage) {
      case 'player':
        return renderPlayerSelection();
      case 'rank':
        return renderRankSelection();
      case 'quantity':
        return renderQuantitySelection();
      case 'suit':
        return renderSuitSelection();
      case 'complete':
        return renderGuessResult();
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto glass-panel animate-scale-in shadow-xl">
      <CardHeader>
        <CardTitle className="text-center">
          {gameState.players[gameState.currentPlayerIndex].name}'s Turn
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderGuessStage()}
      </CardContent>
    </Card>
  );
};

export default GuessInterface;
