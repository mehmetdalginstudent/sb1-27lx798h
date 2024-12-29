import { supabase } from '../lib/supabase';
import { LeaderboardEntry } from '../types';

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return data.map(entry => ({
    id: entry.id,
    playerName: entry.player_name,
    avatarId: entry.avatar_id,
    score: entry.score,
    date: entry.created_at
  }));
}

export async function addLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'date'>): Promise<void> {
  const { error } = await supabase
    .from('leaderboard')
    .insert([{
      player_name: entry.playerName,
      avatar_id: entry.avatarId,
      score: entry.score
    }]);

  if (error) {
    console.error('Error adding leaderboard entry:', error);
  }
}