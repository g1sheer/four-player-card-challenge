
import React, { useState, useEffect } from 'react';
import { Card as CardType, Suit } from '@/utils/gameLogic';
import { Club, Diamond, Heart, Spade } from 'lucide-react';

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

const getSuitIcon = (suit: Suit, size: number = 16) => {
  switch (suit) {
    case 'hearts': return <Heart size={size} className="text-hearts" />;
    case 'diamonds': return <Diamond size={size} className="text-diamonds" />;
    case 'clubs': return <Club size={size} className="text-clubs" />;
    case 'spades': return <Spade size={size} className="text-spades" />;
  }
};

const Card: React.FC<CardProps> = ({ 
  card, 
  revealed = false, 
  onClick, 
  className = '',
  animationDelay = 0 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(revealed);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
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
          <div className="card-back-pattern">
            <div className="card-back-border">
              <div className="card-back-inner">
                <div className="card-back-diamond"></div>
                <div className="card-back-pattern-grid">
                  {Array(9).fill(0).map((_, i) => (
                    <div key={i} className="card-back-pattern-dot"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
