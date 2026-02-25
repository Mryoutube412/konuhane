import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { AnswerRecord } from '../context/GameContext';

interface ResultsState {
  answers: AnswerRecord[];
  subject: string;
  subjectName: string;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState | null;
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);

  if (!state) {
    navigate('/');
    return null;
  }

  const { answers, subjectName } = state;
  const correct = answers.filter(a => a.correct).length;
  const total = answers.length;
  const percentage = Math.round((correct / total) * 100);
  const wrong = answers.filter(a => !a.correct);

  const getEmoji = () => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 70) return '🎉';
    if (percentage >= 50) return '👍';
    return '💪';
  };

  const getMessage = () => {
    if (percentage >= 90) return 'Mükemmel!';
    if (percentage >= 70) return 'Çok iyi!';
    if (percentage >= 50) return 'İyi gidiyorsun!';
    return 'Tekrar dene!';
  };

  if (reviewIndex !== null) {
    const a = answers[reviewIndex];
    return (
      <div className="min-h-screen bg-background bg-pattern flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6 animate-fade-in">
          <div className="bg-card rounded-2xl p-8 card-shadow">
            <p className="text-sm text-muted-foreground mb-2">Soru {reviewIndex + 1} / {total}</p>
            <h2 className="text-xl font-bold text-card-foreground mb-6">{a.question}</h2>
            <div className="space-y-3">
              {a.options.map((opt, i) => {
                const isCorrect = i === a.correctIndex;
                const isSelected = i === a.selectedIndex;
                let cls = 'bg-muted';
                if (isCorrect) cls = 'bg-success/20 border-2 border-success';
                else if (isSelected) cls = 'bg-destructive/20 border-2 border-destructive';
                return (
                  <div key={i} className={`${cls} rounded-xl p-4 font-medium text-card-foreground`}>
                    <span className="text-muted-foreground mr-2 font-bold">{String.fromCharCode(65 + i)})</span>
                    {opt}
                    {isCorrect && ' ✅'}
                    {isSelected && !isCorrect && ' ❌'}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-muted-foreground bg-muted rounded-lg p-3">💡 {a.explanation}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setReviewIndex(null)} className="flex-1 bg-card rounded-xl p-4 card-shadow font-medium text-card-foreground hover:scale-[1.02] transition-transform touch-target">
              ← Sonuçlara Dön
            </button>
            {reviewIndex > 0 && (
              <button onClick={() => setReviewIndex(reviewIndex - 1)} className="bg-card rounded-xl p-4 card-shadow font-medium text-card-foreground hover:scale-[1.02] transition-transform touch-target">
                ◀ Önceki
              </button>
            )}
            {reviewIndex < total - 1 && (
              <button onClick={() => setReviewIndex(reviewIndex + 1)} className="bg-card rounded-xl p-4 card-shadow font-medium text-card-foreground hover:scale-[1.02] transition-transform touch-target">
                Sonraki ▶
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 animate-fade-in">
        {/* Score card */}
        <div className="bg-card rounded-2xl p-8 card-shadow text-center">
          <p className="text-6xl mb-4">{getEmoji()}</p>
          <h1 className="text-3xl font-bold text-card-foreground mb-2">{getMessage()}</h1>
          <p className="text-muted-foreground mb-6">{subjectName} Quiz Sonuçları</p>

          <div className="relative w-36 h-36 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={percentage >= 70 ? 'hsl(var(--success))' : percentage >= 50 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'}
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 327} 327`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-card-foreground">%{percentage}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-muted rounded-xl p-3">
              <p className="text-2xl font-bold text-card-foreground">{total}</p>
              <p className="text-xs text-muted-foreground">Toplam</p>
            </div>
            <div className="bg-success/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-success">{correct}</p>
              <p className="text-xs text-muted-foreground">Doğru</p>
            </div>
            <div className="bg-destructive/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-destructive">{total - correct}</p>
              <p className="text-xs text-muted-foreground">Yanlış</p>
            </div>
          </div>
        </div>

        {/* Answer list */}
        <div className="bg-card rounded-2xl p-6 card-shadow">
          <h2 className="font-bold text-card-foreground mb-4">📋 Tüm Cevaplar</h2>
          <div className="space-y-2">
            {answers.map((a, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left touch-target"
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  a.correct ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                }`}>
                  {a.correct ? '✓' : '✗'}
                </span>
                <span className="text-sm text-card-foreground truncate flex-1">{a.question}</span>
                <span className="text-xs text-muted-foreground">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wrong answers shortcut */}
        {wrong.length > 0 && (
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
            <h2 className="font-bold text-card-foreground mb-3">❌ Yanlış Cevaplar ({wrong.length})</h2>
            <div className="space-y-2">
              {wrong.map((a, i) => {
                const originalIndex = answers.indexOf(a);
                return (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(originalIndex)}
                    className="w-full text-left p-3 rounded-xl hover:bg-destructive/10 transition-colors touch-target"
                  >
                    <p className="text-sm font-medium text-card-foreground">{a.question}</p>
                    <p className="text-xs text-muted-foreground mt-1">Doğru: {a.options[a.correctIndex]}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-card rounded-xl p-4 card-shadow font-medium text-card-foreground hover:scale-[1.02] transition-transform touch-target"
          >
            🏠 Ana Sayfa
          </button>
          <button
            onClick={() => navigate(`/quiz/${state.subject}`)}
            className="flex-1 bg-primary rounded-xl p-4 font-medium text-primary-foreground hover:scale-[1.02] transition-transform touch-target"
          >
            🔄 Tekrar Çöz
          </button>
        </div>
      </div>
    </div>
  );
}
