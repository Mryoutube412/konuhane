import { useGame } from '../context/GameContext';

export default function StatsCards() {
  const { totalScore, totalCorrect, badges } = useGame();
  const earnedBadges = badges.filter(b => b.earned).length;

  const stats = [
    { label: 'Puan', value: totalScore, icon: '⭐', color: 'from-yellow-400 to-orange-400' },
    { label: 'Doğru', value: totalCorrect, icon: '✅', color: 'from-emerald-400 to-green-500' },
    { label: 'Rozet', value: earnedBadges, icon: '🏅', color: 'from-blue-400 to-indigo-500' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(s => (
        <div key={s.label} className="bg-card rounded-2xl p-5 card-shadow flex items-center gap-4 animate-scale-in">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl shrink-0`}>
            {s.icon}
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
