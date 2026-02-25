import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRandomQuestions, SUBJECTS, type Question } from '../data/questions';
import { useAuth } from '../context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '../hooks/useSound';
import { useConfetti } from '../hooks/useConfetti';

const TIMER_DURATION = 20;
const QUESTION_COUNT = 10;
const POINTS = { kolay: 3, orta: 6, zor: 10 };

export default function Quiz() {
  const { subject, topic } = useParams<{ subject: string; topic: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { play, setEnabled } = useSound();
  const { fire, ConfettiOverlay } = useConfetti();

  const [difficultySelect, setDifficultySelect] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [answers, setAnswers] = useState<Array<{ questionId: string; question: string; selectedIndex: number; correctIndex: number; correct: boolean; options: string[]; explanation: string }>>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const answered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const settings = JSON.parse(localStorage.getItem('quiz-settings') || '{"soundEnabled":true,"timerEnabled":true}');
  const subjectInfo = SUBJECTS.find(s => s.id === subject);
  const topicInfo = subjectInfo?.topics.find(t => t.id === topic);

  useEffect(() => { setEnabled(settings.soundEnabled); }, [settings.soundEnabled]);

  const startQuiz = (diff?: string) => {
    setSelectedDifficulty(diff);
    const qs = getRandomQuestions(subject as any, QUESTION_COUNT, topic, diff);
    if (qs.length === 0) { navigate(`/subject/${subject}`); return; }
    setQuestions(qs);
    setDifficultySelect(false);
  };

  // Timer
  useEffect(() => {
    if (difficultySelect || !settings.timerEnabled || questions.length === 0 || feedback) return;
    setTimeLeft(TIMER_DURATION);
    answered.current = false;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!answered.current) handleAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, questions.length, settings.timerEnabled, difficultySelect]);

  const handleAnswer = useCallback((index: number) => {
    if (answered.current) return;
    answered.current = true;
    clearInterval(timerRef.current);

    const q = questions[currentIndex];
    const isCorrect = index === q.correctIndex;
    const points = POINTS[q.difficulty];

    setSelectedIndex(index);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      play('correct');
      fire();
    } else {
      play('wrong');
    }

    // Update DB
    if (user) {
      supabase.from('profiles').select('total_score, total_correct, total_wrong, streak, best_streak').eq('user_id', user.id).single().then(({ data }) => {
        if (!data) return;
        const newStreak = isCorrect ? data.streak + 1 : 0;
        supabase.from('profiles').update({
          total_score: data.total_score + (isCorrect ? points : 0),
          total_correct: data.total_correct + (isCorrect ? 1 : 0),
          total_wrong: data.total_wrong + (isCorrect ? 0 : 1),
          streak: newStreak,
          best_streak: Math.max(newStreak, data.best_streak),
        }).eq('user_id', user.id).then(() => {});
      });
    }

    setAnswers(prev => [...prev, {
      questionId: q.id, question: q.question, selectedIndex: index,
      correctIndex: q.correctIndex, correct: isCorrect, options: [...q.options], explanation: q.explanation,
    }]);

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        const allAnswers = [...answers, { questionId: q.id, question: q.question, selectedIndex: index, correctIndex: q.correctIndex, correct: isCorrect, options: [...q.options], explanation: q.explanation }];
        navigate('/results', { state: { answers: allAnswers, subject, subjectName: subjectInfo?.name, topic, topicName: topicInfo?.name } });
      } else {
        setCurrentIndex(i => i + 1);
        setSelectedIndex(null);
        setFeedback(null);
      }
    }, 1200);
  }, [currentIndex, questions, timeLeft, answers, subject, subjectInfo, user]);

  // Difficulty selection screen
  if (difficultySelect) {
    return (
      <div className="min-h-screen bg-background bg-pattern flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="text-center">
            <p className="text-4xl mb-2">{topicInfo?.icon}</p>
            <h1 className="text-2xl font-bold text-foreground">{topicInfo?.name}</h1>
            <p className="text-muted-foreground">{subjectInfo?.name}</p>
          </div>
          <div className="space-y-3">
            {[
              { key: 'kolay', label: '🟢 Kolay', desc: 'Soru başı 3 puan', color: 'hover:border-green-500' },
              { key: 'orta', label: '🟡 Orta', desc: 'Soru başı 6 puan', color: 'hover:border-yellow-500' },
              { key: 'zor', label: '🔴 Zor', desc: 'Soru başı 10 puan', color: 'hover:border-red-500' },
              { key: undefined as any, label: '🎲 Karışık', desc: 'Tüm zorluklar', color: 'hover:border-primary' },
            ].map(d => (
              <button
                key={d.label}
                onClick={() => startQuiz(d.key)}
                className={`w-full bg-card rounded-2xl p-5 card-shadow border-2 border-transparent ${d.color} transition-all hover:scale-[1.02] active:scale-[0.98] text-left touch-target`}
              >
                <p className="font-bold text-card-foreground text-lg">{d.label}</p>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </button>
            ))}
          </div>
          <button onClick={() => navigate(`/subject/${subject}`)} className="w-full text-center text-muted-foreground hover:text-foreground py-3 touch-target">← Geri</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const q = questions[currentIndex];
  const progress = settings.timerEnabled ? (timeLeft / TIMER_DURATION) * 100 : 100;

  return (
    <div className="min-h-screen bg-background bg-pattern flex flex-col">
      <ConfettiOverlay />
      <div className="bg-card card-shadow px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(`/subject/${subject}`)} className="text-muted-foreground hover:text-foreground transition-colors touch-target text-lg">← Geri</button>
          <span className="font-bold text-foreground">{topicInfo?.icon} {topicInfo?.name}</span>
          <span className="text-sm font-medium text-muted-foreground">{currentIndex + 1} / {questions.length}</span>
        </div>
        {settings.timerEnabled && (
          <div className="max-w-2xl mx-auto mt-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-destructive' : timeLeft <= 10 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{timeLeft} saniye</p>
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6 animate-fade-in" key={currentIndex}>
          <div className="bg-card rounded-2xl p-8 card-shadow">
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              {q.difficulty === 'kolay' ? '🟢 Kolay (+3)' : q.difficulty === 'orta' ? '🟡 Orta (+6)' : '🔴 Zor (+10)'}
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-card-foreground leading-relaxed">{q.question}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isSelected = selectedIndex === i;
              const isCorrectOption = i === q.correctIndex;
              let btnClass = 'bg-card hover:bg-secondary card-shadow hover:card-shadow-hover';
              if (feedback) {
                if (isCorrectOption) btnClass = 'bg-success/20 border-2 border-success glow-success';
                else if (isSelected && !isCorrectOption) btnClass = 'bg-destructive/20 border-2 border-destructive glow-error animate-shake';
                else btnClass = 'bg-muted opacity-50';
              }
              return (
                <button key={i} onClick={() => { play('click'); handleAnswer(i); }} disabled={!!feedback}
                  className={`${btnClass} rounded-xl p-5 text-left font-medium text-card-foreground transition-all duration-200 touch-target disabled:cursor-default ${!feedback ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}`}>
                  <span className="text-muted-foreground mr-2 font-bold">{String.fromCharCode(65 + i)})</span>{opt}
                </button>
              );
            })}
          </div>
          {feedback && (
            <div className={`rounded-xl p-4 text-center text-sm font-medium animate-fade-in ${feedback === 'correct' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
              {feedback === 'correct' ? '✅ Doğru!' : '❌ Yanlış!'} — {q.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
