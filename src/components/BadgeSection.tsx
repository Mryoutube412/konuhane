import { useGame } from '../context/GameContext';

export default function BadgeSection() {
  const { badges } = useGame();

  return (
    <div className="bg-card rounded-2xl p-6 card-shadow">
      <h2 className="text-lg font-bold text-card-foreground mb-4">🏅 Rozetler</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map(b => (
          <div
            key={b.id}
            className={`rounded-xl p-3 text-center transition-all duration-300 ${
              b.earned
                ? 'bg-primary/10 animate-badge-pop'
                : 'bg-muted opacity-50 grayscale'
            }`}
          >
            <div className="text-3xl mb-1">{b.icon}</div>
            <p className="text-xs font-semibold text-card-foreground">{b.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
