
import React from 'react';
import { MATH_SYMBOLS } from '../constants';

interface MathKeyboardProps {
  onKeyPress: (key: string) => void;
}

export const MathKeyboard: React.FC<MathKeyboardProps> = ({ onKeyPress }) => {
  return (
    <div className="grid grid-cols-7 gap-2 mt-4">
      {MATH_SYMBOLS.map((symbol) => (
        <button
          key={symbol}
          onClick={() => onKeyPress(symbol)}
          className="bg-brand-primary h-12 rounded-md text-brand-text font-mono text-lg hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
        >
          {symbol}
        </button>
      ))}
    </div>
  );
};
