
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameBoard from '@/components/GameBoard';

const Game = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <GameBoard onBack={handleBack} />
  );
};

export default Game;
