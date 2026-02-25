import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import BottomNav from '@/components/BottomNav';

interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  total_score: number;
  total_correct: number;
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('user_id, display_name, total_score, total_correct')
      .order('total_score', { ascending: false })
      .limit(100);
    setEntries(data || []);
    setLoading(false);
  };

  const getMedal = (i: number) => {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `${i + 1}`;
  };

  return (
    <div className="min-h-screen bg-background bg-pattern pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">🏆 Dünya Skor Tablosu</h1>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 card-shadow animate-pulse h-16" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 card-shadow text-center">
            <p className="text-4xl mb-3">🏆</p>
            <p className="text-muted-foreground">Henüz kimse quiz çözmemiş. İlk sen ol!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((e, i) => {
              const isMe = e.user_id === user?.id;
              return (
                <div
                  key={e.user_id}
                  className={`flex items-center gap-4 rounded-2xl p-4 transition-all ${
                    isMe ? 'bg-primary/10 border-2 border-primary' : 'bg-card card-shadow'
                  } ${i < 3 ? 'scale-[1.02]' : ''}`}
                >
                  <span className={`w-10 text-center font-bold ${i < 3 ? 'text-2xl' : 'text-lg text-muted-foreground'}`}>
                    {getMedal(i)}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-card-foreground">
                      {e.display_name} {isMe && '(Sen)'}
                    </p>
                    <p className="text-xs text-muted-foreground">{e.total_correct} doğru cevap</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{e.total_score}</p>
                    <p className="text-xs text-muted-foreground">puan</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
