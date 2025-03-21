
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Play, Info, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 p-4">
      {/* Hero Section */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Card Guessing Game
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          A strategic 4-player card game of deduction and memory
        </p>
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full animate-slide-up" style={{ animationDelay: '200ms' }}>
        {/* Play Card */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              Play Game
            </CardTitle>
            <CardDescription>
              Start a new 4-player card game
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Begin a game with 4 players. Cards will be dealt automatically.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/game" className="w-full">
              <Button className="w-full" size="lg">
                Start Game
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Rules Card */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Game Rules
            </CardTitle>
            <CardDescription>
              Learn how to play the game
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Understand the rules and strategy to win the game.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              size="lg"
              onClick={() => setShowRules(!showRules)}
            >
              {showRules ? 'Hide Rules' : 'Show Rules'}
            </Button>
          </CardFooter>
        </Card>

        {/* Settings Card */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Settings
            </CardTitle>
            <CardDescription>
              Customize your game experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Change game settings and preferences.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="lg" disabled>
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Rules Section */}
      {showRules && (
        <Card className="mt-8 max-w-3xl w-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg animate-scale-in">
          <CardHeader>
            <CardTitle>Game Rules</CardTitle>
            <CardDescription>
              Learn how to play the card guessing game
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Setup:</h3>
              <p>A standard deck of 52 cards is dealt equally among 4 players.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Objective:</h3>
              <p>Collect complete sets (all 4 suits of the same rank) to create "treasure chests." The player with the most treasure chests at the end wins.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Gameplay:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>On your turn, select another player to target.</li>
                <li>Guess a card rank (2-10, J, Q, K, A) they might have.</li>
                <li>If correct, guess how many cards of that rank they have (1-4).</li>
                <li>If correct again, guess which suit (hearts, diamonds, clubs, spades).</li>
                <li>If all guesses are correct, you take those cards.</li>
                <li>If any guess is wrong, your turn ends.</li>
                <li>When you collect all 4 suits of a rank, they go to your treasure chest.</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Winning:</h3>
              <p>The game ends when all cards have been placed in treasure chests. The player with the most treasure chests wins!</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setShowRules(false)}>Close Rules</Button>
          </CardFooter>
        </Card>
      )}

      {/* Footer */}
      <div className="mt-16 text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '400ms' }}>
        Card Guessing Game &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Index;
