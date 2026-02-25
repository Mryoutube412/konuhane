import { useState, useCallback } from 'react';

export function useConfetti() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  const fire = useCallback(() => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  }, []);

  const ConfettiOverlay = () =>
    particles.length > 0 ? (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute top-0 w-3 h-3 rounded-sm"
            style={{
              left: `${p.x}%`,
              backgroundColor: p.color,
              animation: `confetti-fall 1.5s ease-in ${p.delay}s forwards`,
            }}
          />
        ))}
      </div>
    ) : null;

  return { fire, ConfettiOverlay };
}
