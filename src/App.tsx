import React, { useState } from 'react';
import { GameCard } from './components/GameCard';
import { AnimatedBackground } from './components/AnimatedBackground';
import { PlayerSetup } from './components/PlayerSetup';
import { ScoreBoard } from './components/ScoreBoard';
import { Leaderboard } from './components/Leaderboard';
import { Player } from './types';
import { avatars } from './data/avatars';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useGame } from './hooks/useGame';

export default function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const { entries: leaderboard, loading: leaderboardLoading, addEntry } = useLeaderboard();
  const { currentQuestion, gameStats, gameOver, handleAnswer, resetGame } = useGame();

  const handlePlayerAnswer = async (answer: boolean) => {
    const isGameOver = await handleAnswer(answer);
    if (isGameOver && player) {
      await addEntry({
        playerName: player.name,
        avatarId: player.avatarId,
        score: gameStats.correctAnswers + (answer === currentQuestion.correctAnswer ? 1 : 0)
      });
    }
  };

  const handleNewPlayer = () => {
    setPlayer(null);
    resetGame();
  };

  const avatarUrl = player ? (avatars.find(a => a.id === player.avatarId)?.url || avatars[0].url) : '';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      {player && !leaderboardLoading && <Leaderboard entries={leaderboard} />}
      {player && (
        <ScoreBoard
          stats={gameStats}
          playerName={player.name}
          avatarUrl={avatarUrl}
        />
      )}
      {!player ? (
        <PlayerSetup onComplete={setPlayer} />
      ) : (
        <GameCard
          gameOver={gameOver}
          score={gameStats.correctAnswers}
          questionCount={gameStats.totalQuestions}
          currentQuestion={currentQuestion}
          onAnswer={handlePlayerAnswer}
          onRestart={resetGame}
          onNewPlayer={handleNewPlayer}
        />
      )}
    </div>
  );
}