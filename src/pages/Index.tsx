import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import SubjectGrid from '../components/SubjectGrid';
import BottomNav from '../components/BottomNav';

export default function Index() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('*').eq('user_id', user.id).single().then(({ data }) => setProfile(data));
  }, [user]);

  return (
    <div className="min-h-screen bg-background bg-pattern pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Merhaba, {profile?.display_name || 'Öğrenci'}! 👋</h1>
          <p className="text-muted-foreground mt-1">Bir ders seçerek konuları çöz</p>
          {profile && (
            <div className="flex gap-4 mt-3">
              {[
                { label: 'Puan', value: profile.total_score, icon: '⭐' },
                { label: 'Doğru', value: profile.total_correct, icon: '✅' },
                { label: 'Seri', value: profile.streak, icon: '🔥' },
              ].map(s => (
                <div key={s.label} className="bg-card rounded-xl px-4 py-2 card-shadow flex items-center gap-2">
                  <span>{s.icon}</span>
                  <span className="font-bold text-card-foreground">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">📚 Dersler</h2>
          <SubjectGrid />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
