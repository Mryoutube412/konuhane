import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/', icon: '🏠', label: 'Ana Sayfa' },
  { path: '/leaderboard', icon: '🏆', label: 'Skor Tablosu' },
  { path: '/messages', icon: '💬', label: 'Mesajlar' },
  { path: '/profile', icon: '👤', label: 'Profil' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border card-shadow z-40">
      <div className="max-w-lg mx-auto flex">
        {tabs.map(t => {
          const active = pathname === t.path;
          return (
            <button
              key={t.path}
              onClick={() => navigate(t.path)}
              className={`flex-1 flex flex-col items-center py-3 transition-colors touch-target ${
                active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-xl">{t.icon}</span>
              <span className="text-[10px] font-medium mt-0.5">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
