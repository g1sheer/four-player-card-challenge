
import React, { useState, useEffect } from 'react';
import { Card as CardType } from '@/utils/gameLogic';
import { Heart, Diamond, Club, Spade } from 'lucide-react';

interface CardProps {
  card: CardType;
  revealed: boolean;
  animationDelay?: number;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Component that renders a playing card
 * @param card The card data to render
 * @param revealed Whether the card should be shown face-up or face-down
 * @param animationDelay Optional delay for entrance animation
 * @param size Size variant for the card (small, medium, large)
 */
const Card: React.FC<CardProps> = ({ 
  card, 
  revealed = false,
  animationDelay = 0,
  size = 'medium'
}) => {
  // State to track card flip animation
  const [isFlipped, setIsFlipped] = useState(false);
  // State to skip animation on initial render
  const [isInitialRender, setIsInitialRender] = useState(true);

  /**
   * Returns CSS classes based on the requested card size
   */
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-24 text-sm';
      case 'large':
        return 'w-28 h-40 text-lg';
      case 'medium':
      default:
        return 'w-24 h-36 text-base';
    }
  };
  
  /**
   * Returns the appropriate icon size based on card size
   */
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 18;
      case 'medium':
      default:
        return 14;
    }
  };

  // Handle reveal changes and animation
  useEffect(() => {
    // Skip the animation on initial render
    if (isInitialRender) {
      setIsFlipped(revealed);
      setIsInitialRender(false);
      return;
    }
    
    // Always animate when revealed state changes
    setIsFlipped(revealed);
  }, [revealed]);

  /**
   * Returns the appropriate suit icon component
   */
  const SuitIcon = () => {
    const iconSize = getIconSize();
    
    switch (card.suit) {
      case 'hearts':
        return <Heart size={iconSize} className="text-hearts" />;
      case 'diamonds':
        return <Diamond size={iconSize} className="text-diamonds" />;
      case 'clubs':
        return <Club size={iconSize} className="text-clubs" />;
      case 'spades':
        return <Spade size={iconSize} className="text-spades" />;
    }
  };

  const sizeClass = getSizeClasses();

  return (
    <div 
      className={`flip-card ${sizeClass} ${isFlipped ? 'flipped' : ''}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Card flip container */}
      <div className="flip-card-inner w-full h-full">
        {/* Card Front */}
        <div className="flip-card-front w-full h-full">
          <div className={`card-front w-full h-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md`}>
            <div className="p-1.5 flex flex-col justify-between h-full">
              {/* Top left rank and suit */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-left">
                  <div className="font-bold">{card.rank}</div>
                  <SuitIcon />
                </div>
              </div>
              
              {/* Center suit */}
              <div className="flex justify-center items-left">
                <SuitIcon />
              </div>
              
              {/* Bottom right rank and suit (inverted) */}
              <div className="flex items-center justify-between">
                <div className="flex-grow"></div>
                <div className="rotate-180 flex flex-col items-center">
                  <div className="font-bold">{card.rank}</div>
                  <SuitIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Back */}
        <div className="flip-card-back w-full h-full">
          <div className="card-back-pattern w-full h-full">
            <div className="card-back-border">
              <div className="card-back-inner">
                <div className="card-back-diamond"></div>
                <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3">
                  {Array.from({ length: 9 }).map((_, i) => (
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
