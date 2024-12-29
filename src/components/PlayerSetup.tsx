import React, { useState } from 'react';
import { Player } from '../types';
import { avatars } from '../data/avatars';

interface PlayerSetupProps {
  onComplete: (player: Player) => void;
}

export function PlayerSetup({ onComplete }: PlayerSetupProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name, avatarId: selectedAvatar });
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 max-w-md w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Hoş Geldin!</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
            Adın nedir?
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Adını yaz"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-4">
            Karakterini seç
          </label>
          <div className="grid grid-cols-4 gap-4">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`p-2 rounded-lg transition-all ${
                  selectedAvatar === avatar.id
                    ? 'ring-4 ring-blue-500 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={avatar.url}
                  alt={`Avatar ${avatar.id}`}
                  className="w-full h-auto rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
        >
          Oyuna Başla
        </button>
      </form>
    </div>
  );
}