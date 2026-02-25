import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRandomQuestions, SUBJECTS, type Question } from '../data/questions';
import { useGame } from '../context/GameContext';
import { useSound } from '../hooks/useSound';
import { useConfetti } from '../hooks/useConfetti';

const TIMER_DURATION = 20;
const QUESTION_COUNT = 10;
const CORRECT_POINTS = 10;
const FAST_BONUS = 5;

export default function Quiz() {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { settings, addScore, addCorrect, addWrong, incrementStreak, resetStreak, earnBadge } = useGame();
  const { play, setEnabled } = useSound();
  const { fire, ConfettiOverlay } = useConfetti();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [answers, setAnswers] = useState<Array<{ questionId: string; question: string; selectedIndex: number; correctIndex: number; correct: boolean; options: string[]; explanation: string }>>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const answered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const subjectInfo = SUBJECTS.find(s => s.id === subject);

  useEffect(() => { setEnabled(settings.soundEnabled); }, [settings.soundEnabled, setEnabled]);

  useEffect(() => {
    if (!subject) return;
    const qs = getRandomQuestions(subject as any, QUESTION_COUNT);
    if (qs.length === 0) { navigate('/'); return; }
    setQuestions(qs);
  }, [subject, navigate]);

  // Timer
  useEffect(() => {
    if (!settings.timerEnabled || questions.length === 0 || feedback) return;
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
  }, [currentIndex, questions.length, settings.timerEnabled]);

  const handleAnswer = useCallback((index: number) => {
    if (answered.current) return;
    answered.current = true;
    clearInterval(timerRef.current);

    const q = questions[currentIndex];
    const isCorrect = index === q.correctIndex;
    const elapsed = TIMER_DURATION - timeLeft;

    setSelectedIndex(index);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      play('correct');
      fire();
      addCorrect();
      incrementStreak();
      const bonus = elapsed < 5 ? FAST_BONUS : 0;
      addScore(CORRECT_POINTS + bonus);
      if (elapsed < 5) earnBadge('speed_master');
    } else {
      play('wrong');
      addWrong();
      resetStreak();
    }

    setAnswers(prev => [...prev, {
      questionId: q.id,
      question: q.question,
      selectedIndex: index,
      correctIndex: q.correctIndex,
      correct: isCorrect,
      options: [...q.options],
      explanation: q.explanation,
    }]);

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        navigate('/results', { state: { answers: [...answers, { questionId: q.id, question: q.question, selectedIndex: index, correctIndex: q.correctIndex, correct: isCorrect, options: [...q.options], explanation: q.explanation }], subject: subject, subjectName: subjectInfo?.name } });
      } else {
        setCurrentIndex(i => i + 1);
        setSelectedIndex(null);
        setFeedback(null);
      }
    }, 1200);
  }, [currentIndex, questions, timeLeft, answers, subject, subjectInfo]);

  if (questions.length === 0) return null;

  const q = questions[currentIndex];
  const progress = settings.timerEnabled ? (timeLeft / TIMER_DURATION) * 100 : 100;

  return (
    <div className="min-h-screen bg-background bg-pattern flex flex-col">
      <ConfettiOverlay />

      {/* Top bar */}
      <div className="bg-card card-shadow px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors touch-target text-lg">
            ← Geri
          </button>
          <span className="font-bold text-foreground">{subjectInfo?.icon} {subjectInfo?.name}</span>
          <span className="text-sm font-medium text-muted-foreground">{currentIndex + 1} / {questions.length}</span>
        </div>
        {settings.timerEnabled && (
          <div className="max-w-2xl mx-auto mt-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                  timeLeft <= 5 ? 'bg-destructive' : timeLeft <= 10 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{timeLeft} saniye</p>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6 animate-fade-in" key={currentIndex}>
          <div className="bg-card rounded-2xl p-8 card-shadow">
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              {q.difficulty === 'kolay' ? '🟢 Kolay' : q.difficulty === 'orta' ? '🟡 Orta' : '🔴 Zor'}
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
                <button
                  key={i}
                  onClick={() => { play('click'); handleAnswer(i); }}
                  disabled={!!feedback}
                  className={`${btnClass} rounded-xl p-5 text-left font-medium text-card-foreground transition-all duration-200 touch-target disabled:cursor-default ${
                    !feedback ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                  }`}
                >
                  <span className="text-muted-foreground mr-2 font-bold">{String.fromCharCode(65 + i)})</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`rounded-xl p-4 text-center text-sm font-medium animate-fade-in ${
              feedback === 'correct' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
            }`}>
              {feedback === 'correct' ? '✅ Doğru!' : '❌ Yanlış!'} — {q.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
