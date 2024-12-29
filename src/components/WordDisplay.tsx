import React from 'react';

interface WordDisplayProps {
  word: string;
}

export function WordDisplay({ word }: WordDisplayProps) {
  return (
    <div className="bg-blue-50/80 backdrop-blur rounded-lg p-8">
      <div className="text-center space-y-4">
        <p className="text-6xl font-bold text-blue-600 transition-all duration-300 hover:scale-105">
          {word}
        </p>
        <p className="text-lg text-gray-600">
          Bu kelimeyi doğru okuyabilir misin?
        </p>
      </div>
    </div>
  );
}