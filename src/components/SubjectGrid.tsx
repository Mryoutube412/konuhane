import { SUBJECTS, type SubjectInfo } from '../data/questions';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

export default function SubjectGrid() {
  const navigate = useNavigate();
  const { play } = useSound();

  const handleClick = (subject: SubjectInfo) => {
    play('click');
    navigate(`/quiz/${subject.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {SUBJECTS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => handleClick(s)}
          className={`${s.gradient} rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 active:scale-[0.98] card-shadow hover:card-shadow-hover touch-target group`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="text-4xl mb-3">{s.icon}</div>
          <h3 className="text-xl font-bold text-primary-foreground mb-1">{s.name}</h3>
          <p className="text-primary-foreground/80 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Soruları Çöz <span className="text-lg">→</span>
          </p>
        </button>
      ))}
    </div>
  );
}
