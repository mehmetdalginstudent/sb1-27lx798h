import React from 'react';
import { Trophy } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { avatars } from '../data/avatars';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-800">Günün Şampiyonları</h2>
      </div>
      
      <div className="space-y-3">
        {entries.map((entry, index) => {
          const avatar = avatars.find(a => a.id === entry.avatarId) || avatars[0];
          
          return (
            <div
              key={entry.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                index === 0 ? 'bg-yellow-100' :
                index === 1 ? 'bg-gray-100' :
                index === 2 ? 'bg-orange-100' :
                'bg-white'
              }`}
            >
              <div className="flex-shrink-0 w-8 text-center font-bold text-gray-600">
                {index + 1}
              </div>
              <img
                src={avatar.url}
                alt={`${entry.playerName}'in avatarı`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-grow">
                <p className="font-medium text-gray-800 truncate">{entry.playerName}</p>
                <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString('tr-TR')}</p>
              </div>
              <div className="flex-shrink-0 font-bold text-blue-600">
                {entry.score}/10
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}