
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameBoard from '@/components/GameBoard';

/**
 * Game page component that contains the GameBoard
 * Provides navigation functionality
 */
const Game = () => {
  const navigate = useNavigate();

  /**
   * Handler to navigate back to the home page
   */
  const handleBack = () => {
    navigate('/');
  };

  return (
    <GameBoard onBack={handleBack} />
  );
};

export default Game;
