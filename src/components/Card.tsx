
import React, { useState, useEffect } from 'react';
import { Card as CardType, Suit } from '@/utils/gameLogic';

interface CardProps {
  card: CardType;
  revealed?: boolean;
  onClick?: () => void;
  className?: string;
  animationDelay?: number;
}

const getSuitSymbol = (suit: Suit): string => {
  switch (suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
  }
};

const Card: React.FC<CardProps> = ({ 
  card, 
  revealed = true, 
  onClick, 
  className = '',
  animationDelay = 0 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(revealed);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  useEffect(() => {
    setIsRevealed(revealed);
  }, [revealed]);

  const suitSymbol = getSuitSymbol(card.suit);
  const suitClass = card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-' + card.suit : 'text-' + card.suit;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div 
      className={`flip-card ${isRevealed ? 'flipped' : ''} ${isAnimating ? 'animate-card-deal' : 'opacity-0'} ${className}`}
      onClick={handleClick}
      style={{ 
        animationDelay: `${animationDelay}ms`,
        transitionDelay: `${animationDelay}ms`
      }}
    >
      <div className="flip-card-inner playing-card">
        <div className="flip-card-front card-front">
          <div className="flex justify-between items-start">
            <div className={`text-lg font-bold ${suitClass}`}>{card.rank}</div>
            <div className={`text-lg ${suitClass}`}>{suitSymbol}</div>
          </div>
          <div className={`text-4xl self-center ${suitClass}`}>{suitSymbol}</div>
          <div className="flex justify-between items-end rotate-180">
            <div className={`text-lg font-bold ${suitClass}`}>{card.rank}</div>
            <div className={`text-lg ${suitClass}`}>{suitSymbol}</div>
          </div>
        </div>
        <div className="flip-card-back card-back">
          <div className="text-white opacity-50 flex flex-col items-center justify-center h-full">
            <div className="text-2xl mb-2">
              <span className="text-hearts">♥</span> <span className="text-diamonds">♦</span>
            </div>
            <div className="text-2xl">
              <span className="text-clubs">♣</span> <span className="text-spades">♠</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
