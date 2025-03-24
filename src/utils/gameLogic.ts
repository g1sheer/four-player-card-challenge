/**
 * Types for card suits in the game
 */
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

/**
 * Types for card ranks in the game
 */
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

/**
 * Interface representing a playing card
 */
export interface Card {
  suit: Suit;
  rank: Rank;
  id: string; // Unique identifier for the card
}

/**
 * Interface representing a player in the game
 */
export interface Player {
  id: number;
  name: string;
  cards: Card[];
  treasureChests: { rank: Rank, suits: Suit[] }[];
}

/**
 * Interface representing the current state of the game
 */
export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  selectedPlayerIndex: number | null;
  guessStage: 'player' | 'rank' | 'quantity' | 'suit' | 'complete';
  guessedRank: Rank | null;
  guessedQuantity: number | null;
  guessedSuits: Suit[] | null;
  lastGuessCorrect: boolean | null;
  gameOver: boolean;
  winner: number | null;
}

/**
 * Constants for all suits and ranks in the game
 */
export const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

/**
 * Creates a full deck of cards
 * @returns An array of Card objects representing a complete deck
 */
export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        suit,
        rank,
        id: `${rank}-${suit}`
      });
    }
  }
  
  return deck;
};

/**
 * Shuffles a deck of cards using the Fisher-Yates algorithm
 * @param deck The deck of cards to shuffle
 * @returns A new shuffled array of cards
 */
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Deals cards to players from a deck
 * @param deck The deck of cards to deal from
 * @param numPlayers The number of players to deal to
 * @returns An array of card arrays, one for each player
 */
export const dealCards = (deck: Card[], numPlayers: number): Card[][] => {
  const hands: Card[][] = Array(numPlayers).fill(null).map(() => []);
  const shuffledDeck = shuffleDeck(deck);
  
  for (let i = 0; i < shuffledDeck.length; i++) {
    const playerIndex = i % numPlayers;
    hands[playerIndex].push(shuffledDeck[i]);
  }
  
  return hands;
};

/**
 * Initializes a new game state
 * @param playerNames Optional array of player names (defaults to "Player 1", etc.)
 * @returns A new GameState object with initial values
 */
export const initializeGame = (playerNames: string[] = ['Player 1', 'Player 2', 'Player 3', 'Player 4']): GameState => {
  const deck = createDeck();
  const hands = dealCards(deck, 4);
  
  const players: Player[] = hands.map((cards, index) => ({
    id: index,
    name: playerNames[index] || `Player ${index + 1}`,
    cards,
    treasureChests: []
  }));
  
  return {
    players,
    currentPlayerIndex: 0,
    selectedPlayerIndex: null,
    guessStage: 'player',
    guessedRank: null,
    guessedQuantity: null,
    guessedSuits: null,
    lastGuessCorrect: null,
    gameOver: false,
    winner: null
  };
};

/**
 * Counts how many cards of a specific rank a player has
 * @param cards Array of cards to check
 * @param rank The rank to count
 * @returns The number of cards of the specified rank
 */
export const countCardsByRank = (cards: Card[], rank: Rank): number => {
  return cards.filter(card => card.rank === rank).length;
};

/**
 * Retrieves cards with a specific rank and suit
 * @param cards Array of cards to filter
 * @param rank The rank to filter by
 * @param suit The suit to filter by
 * @returns Array of cards matching both rank and suit
 */
export const getCardsByRankAndSuit = (cards: Card[], rank: Rank, suit: Suit): Card[] => {
  return cards.filter(card => card.rank === rank && card.suit === suit);
};

/**
 * Checks if a player has complete sets (4 cards of same rank) to form treasure chests
 * @param cards Array of player's cards
 * @returns Array of treasure chests (complete sets)
 */
export const checkForTreasureChest = (cards: Card[]): { rank: Rank, suits: Suit[] }[] => {
  const treasureChests: { rank: Rank, suits: Suit[] }[] = [];
  
  for (const rank of RANKS) {
    const suitsForRank = cards
      .filter(card => card.rank === rank)
      .map(card => card.suit);
    
    // Check if we have all 4 suits for this rank
    const uniqueSuits = [...new Set(suitsForRank)];
    if (uniqueSuits.length === 4) {
      treasureChests.push({
        rank,
        suits: uniqueSuits as Suit[]
      });
    }
  }
  
  return treasureChests;
};

/**
 * Removes specific cards from a player's hand
 * @param player The player object
 * @param cardsToRemove Array of cards to remove
 * @returns Updated player object with cards removed
 */
export const removeCardsFromPlayer = (player: Player, cardsToRemove: Card[]): Player => {
  const updatedCards = player.cards.filter(card => 
    !cardsToRemove.some(c => c.id === card.id)
  );
  
  return {
    ...player,
    cards: updatedCards
  };
};

/**
 * Adds cards to a player's hand
 * @param player The player object
 * @param cardsToAdd Array of cards to add
 * @returns Updated player object with new cards
 */
export const addCardsToPlayer = (player: Player, cardsToAdd: Card[]): Player => {
  return {
    ...player,
    cards: [...player.cards, ...cardsToAdd]
  };
};

/**
 * Checks if the game is over (when all cards are in treasure chests)
 * @param players Array of player objects
 * @returns Boolean indicating if the game is over
 */
export const checkGameOver = (players: Player[]): boolean => {
  // Game is over when all cards have been placed in treasure chests
  const totalCards = players.reduce((sum, player) => sum + player.cards.length, 0);
  return totalCards === 0;
};

/**
 * Determines the winner of the game based on who has the most treasure chests
 * @param players Array of player objects
 * @returns ID of the winning player
 */
export const determineWinner = (players: Player[]): number => {
  let maxChests = -1;
  let winnerId = -1;
  
  players.forEach(player => {
    if (player.treasureChests.length > maxChests) {
      maxChests = player.treasureChests.length;
      winnerId = player.id;
    }
  });
  
  return winnerId;
};

/**
 * Processes a player's guess and updates the game state accordingly
 * @param gameState Current game state
 * @param targetPlayerId ID of the player being guessed from (or null)
 * @param rank The rank being guessed (or null)
 * @param quantity The quantity of cards being guessed (or null)
 * @param suits The suits being guessed (or null)
 * @returns Updated game state after processing the guess
 */
export const makeGuess = (
  gameState: GameState,
  targetPlayerId: number | null = null,
  rank: Rank | null = null,
  quantity: number | null = null,
  suits: Suit[] | null = null
): GameState => {
  let newState = { ...gameState };
  
  // Based on the guess stage, update the state
  switch (newState.guessStage) {
    case 'player':
      if (targetPlayerId !== null) {
        newState.selectedPlayerIndex = targetPlayerId;
        newState.guessStage = 'rank';
      }
      break;
      
    case 'rank':
      if (rank !== null) {
        newState.guessedRank = rank;
        const targetPlayer = newState.players[newState.selectedPlayerIndex!];
        const hasRank = targetPlayer.cards.some(card => card.rank === rank);
        
        if (hasRank) {
          newState.guessStage = 'quantity';
        } else {
          // Incorrect guess, next player's turn
          newState.lastGuessCorrect = false;
          newState.guessStage = 'complete';
        }
      }
      break;
      
    case 'quantity':
      if (quantity !== null && newState.guessedRank !== null) {
        newState.guessedQuantity = quantity;
        const targetPlayer = newState.players[newState.selectedPlayerIndex!];
        const actualQuantity = countCardsByRank(targetPlayer.cards, newState.guessedRank);
        
        if (actualQuantity === quantity) {
          newState.guessStage = 'suit';
        } else {
          // Incorrect guess, next player's turn
          newState.lastGuessCorrect = false;
          newState.guessStage = 'complete';
        }
      }
      break;
      
    case 'suit':
      if (suits !== null && suits.length > 0 && newState.guessedRank !== null && newState.guessedQuantity !== null) {
        newState.guessedSuits = suits;
        const targetPlayer = newState.players[newState.selectedPlayerIndex!];
        
        // Check if player has all the guessed suits for the rank
        let allSuitsCorrect = true;
        const matchingCards: Card[] = [];
        
        for (const suit of suits) {
          const cardsWithRankAndSuit = getCardsByRankAndSuit(targetPlayer.cards, newState.guessedRank, suit);
          if (cardsWithRankAndSuit.length === 0) {
            allSuitsCorrect = false;
            break;
          }
          matchingCards.push(...cardsWithRankAndSuit);
        }
        
        if (allSuitsCorrect && matchingCards.length === newState.guessedQuantity) {
          // Correct guess! Take the cards
          const currentPlayer = newState.players[newState.currentPlayerIndex];
          const targetPlayer = newState.players[newState.selectedPlayerIndex!];
          
          // Remove the cards from target player
          const updatedTargetPlayer = removeCardsFromPlayer(targetPlayer, matchingCards);
          
          // Add the cards to current player
          const updatedCurrentPlayer = addCardsToPlayer(currentPlayer, matchingCards);
          
          // Check if the current player can make a treasure chest
          const potentialTreasureChests = checkForTreasureChest(updatedCurrentPlayer.cards);
          
          if (potentialTreasureChests.length > 0) {
            // New treasure chest formed!
            const newChests = potentialTreasureChests.filter(
              chest => !currentPlayer.treasureChests.some(c => c.rank === chest.rank)
            );
            
            // Remove cards that are in the treasure chest
            let playerWithNewChests = { ...updatedCurrentPlayer };
            
            for (const chest of newChests) {
              const cardsForChest = playerWithNewChests.cards.filter(
                card => card.rank === chest.rank && chest.suits.includes(card.suit)
              );
              
              playerWithNewChests = removeCardsFromPlayer(playerWithNewChests, cardsForChest);
              playerWithNewChests.treasureChests.push(chest);
            }
            
            // Update the players array
            newState.players = newState.players.map(player => {
              if (player.id === currentPlayer.id) return playerWithNewChests;
              if (player.id === targetPlayer.id) return updatedTargetPlayer;
              return player;
            });
          } else {
            // Update the players array
            newState.players = newState.players.map(player => {
              if (player.id === currentPlayer.id) return updatedCurrentPlayer;
              if (player.id === targetPlayer.id) return updatedTargetPlayer;
              return player;
            });
          }
          
          newState.lastGuessCorrect = true;
        } else {
          // Incorrect guess
          newState.lastGuessCorrect = false;
        }
        
        newState.guessStage = 'complete';
      }
      break;
      
    case 'complete':
      // Reset the guess state and move to the next player if the guess was wrong
      newState.selectedPlayerIndex = null;
      newState.guessedRank = null;
      newState.guessedQuantity = null;
      newState.guessedSuits = null;
      
      if (!newState.lastGuessCorrect) {
        newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
      }
      
      newState.lastGuessCorrect = null;
      newState.guessStage = 'player';
      
      // Check if the game is over
      if (checkGameOver(newState.players)) {
        newState.gameOver = true;
        newState.winner = determineWinner(newState.players);
      }
      
      break;
  }
  
  return newState;
};
