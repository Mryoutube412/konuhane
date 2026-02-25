import StatsCards from '../components/StatsCards';
import SubjectGrid from '../components/SubjectGrid';
import BadgeSection from '../components/BadgeSection';
import SettingsModal from '../components/SettingsModal';
import { useGame } from '../context/GameContext';

export default function Index() {
  const { streak, bestStreak } = useGame();

  return (
    <div className="min-h-screen bg-background bg-pattern">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">Merhaba, Öğrenci! 👋</h1>
            <p className="text-muted-foreground mt-1">Bir ders seçerek konuları çöz</p>
            {(streak > 0 || bestStreak > 0) && (
              <p className="text-sm text-muted-foreground mt-1">
                🔥 Seri: {streak} | 🏆 En iyi: {bestStreak}
              </p>
            )}
          </div>
          <SettingsModal />
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Subjects */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">📚 Dersler</h2>
          <SubjectGrid />
        </div>

        {/* Badges */}
        <BadgeSection />
      </div>
    </div>
  );
}
