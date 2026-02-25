import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ALL_BADGES, getBadgeById, getRarityColor } from '@/data/badges';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';

export default function Profile() {
  const { user, signOut, resetAccount } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<string[]>([]);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    timerEnabled: true,
    presentationMode: false,
    darkMode: false,
  });
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadProfile();
    loadBadges();
    const saved = localStorage.getItem('quiz-settings');
    if (saved) setSettings(JSON.parse(saved));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('quiz-settings', JSON.stringify(settings));
    if (settings.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    if (settings.presentationMode) document.documentElement.classList.add('presentation-mode');
    else document.documentElement.classList.remove('presentation-mode');
  }, [settings]);

  const loadProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('user_id', user!.id).single();
    setProfile(data);
  };

  const loadBadges = async () => {
    const { data } = await supabase.from('user_badges').select('badge_id').eq('user_id', user!.id);
    setEarnedBadgeIds((data || []).map(b => b.badge_id));
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleReset = async () => {
    await resetAccount();
    setConfirmReset(false);
    loadProfile();
    loadBadges();
  };

  if (!profile) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Yükleniyor...</p></div>;

  return (
    <div className="min-h-screen bg-background bg-pattern pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Header */}
        <div className="bg-card rounded-2xl p-6 card-shadow text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary mx-auto mb-3">
            {profile.display_name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-card-foreground">{profile.display_name}</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Puan', value: profile.total_score, icon: '⭐' },
            { label: 'Doğru', value: profile.total_correct, icon: '✅' },
            { label: 'Yanlış', value: profile.total_wrong, icon: '❌' },
            { label: 'Rozet', value: earnedBadgeIds.length, icon: '🏅' },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-2xl p-4 card-shadow text-center">
              <p className="text-2xl">{s.icon}</p>
              <p className="text-xl font-bold text-card-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="bg-card rounded-2xl p-6 card-shadow">
          <h2 className="text-lg font-bold text-card-foreground mb-4">🏅 Rozetlerim ({earnedBadgeIds.length}/{ALL_BADGES.length})</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {ALL_BADGES.map(b => {
              const earned = earnedBadgeIds.includes(b.id);
              return (
                <div key={b.id} className={`rounded-xl p-2 text-center transition-all ${earned ? 'animate-badge-pop' : 'opacity-30 grayscale'}`}>
                  <div className="text-2xl mb-0.5">{b.icon}</div>
                  <p className="text-[9px] font-semibold text-card-foreground leading-tight">{b.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-2xl p-6 card-shadow space-y-4">
          <h2 className="text-lg font-bold text-card-foreground">⚙️ Ayarlar</h2>
          {[
            { icon: '🔊', label: 'Ses', key: 'soundEnabled' as const },
            { icon: '⏱️', label: 'Süre', key: 'timerEnabled' as const },
            { icon: '🖥️', label: 'Sunum Modu', key: 'presentationMode' as const },
            { icon: '🌙', label: 'Karanlık Mod', key: 'darkMode' as const },
          ].map(s => (
            <div key={s.key} className="flex items-center justify-between">
              <span className="text-base font-medium text-card-foreground">{s.icon} {s.label}</span>
              <Switch checked={settings[s.key]} onCheckedChange={v => setSettings(p => ({ ...p, [s.key]: v }))} />
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-2xl p-6 card-shadow space-y-3">
          {!confirmReset ? (
            <Button variant="destructive" className="w-full rounded-xl touch-target" onClick={() => setConfirmReset(true)}>
              🔄 Hesabı Sıfırla (Puanlar + Rozetler)
            </Button>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-destructive font-medium text-center">Tüm puanlar ve rozetler silinecek. Emin misiniz?</p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setConfirmReset(false)}>İptal</Button>
                <Button variant="destructive" className="flex-1 rounded-xl" onClick={handleReset}>Sıfırla</Button>
              </div>
            </div>
          )}

          {!confirmLogout ? (
            <Button variant="outline" className="w-full rounded-xl touch-target" onClick={() => setConfirmLogout(true)}>
              🚪 Çıkış Yap
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setConfirmLogout(false)}>İptal</Button>
              <Button variant="destructive" className="flex-1 rounded-xl" onClick={handleLogout}>Çıkış Yap</Button>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
