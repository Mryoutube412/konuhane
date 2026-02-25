import { useCallback, useRef } from 'react';

type SoundType = 'correct' | 'wrong' | 'click' | 'badge';

const audioCtxRef = { current: null as AudioContext | null };

function getAudioContext(): AudioContext {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtxRef.current;
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

const soundMap: Record<SoundType, () => void> = {
  correct: () => {
    playTone(523, 0.15, 'sine', 0.12);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.12), 100);
    setTimeout(() => playTone(784, 0.25, 'sine', 0.12), 200);
  },
  wrong: () => {
    playTone(300, 0.2, 'square', 0.08);
    setTimeout(() => playTone(250, 0.3, 'square', 0.08), 150);
  },
  click: () => {
    playTone(800, 0.05, 'sine', 0.06);
  },
  badge: () => {
    playTone(523, 0.1, 'sine', 0.1);
    setTimeout(() => playTone(659, 0.1, 'sine', 0.1), 80);
    setTimeout(() => playTone(784, 0.1, 'sine', 0.1), 160);
    setTimeout(() => playTone(1047, 0.3, 'sine', 0.12), 240);
  },
};

export function useSound() {
  const enabled = useRef(true);

  const setEnabled = useCallback((v: boolean) => { enabled.current = v; }, []);

  const play = useCallback((type: SoundType) => {
    if (!enabled.current) return;
    try { soundMap[type](); } catch {}
  }, []);

  return { play, setEnabled };
}
