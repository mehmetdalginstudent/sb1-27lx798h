import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { GameStats } from '../types';

interface ScoreBoardProps {
  stats: GameStats;
  playerName: string;
  avatarUrl: string;
}

export function ScoreBoard({ stats, playerName, avatarUrl }: ScoreBoardProps) {
  return (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={`${playerName}'in avatarı`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-medium text-gray-800">{playerName}</p>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-green-700">{stats.correctAnswers}</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{stats.wrongAnswers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}