import { useParams, useNavigate } from 'react-router-dom';
import { SUBJECTS, getQuestionsByTopic } from '@/data/questions';
import BottomNav from '@/components/BottomNav';

export default function SubjectDetail() {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const subjectInfo = SUBJECTS.find(s => s.id === subject);

  if (!subjectInfo) { navigate('/'); return null; }

  return (
    <div className="min-h-screen bg-background bg-pattern pb-20">
      <div className={`${subjectInfo.gradient} px-4 py-8`}>
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/')} className="text-primary-foreground/80 hover:text-primary-foreground mb-4 touch-target text-lg">← Geri</button>
          <h1 className="text-3xl font-bold text-primary-foreground">{subjectInfo.icon} {subjectInfo.name}</h1>
          <p className="text-primary-foreground/80 mt-1">Bir konu seç ve çözmeye başla</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        {subjectInfo.topics.map(topic => {
          const questionCount = getQuestionsByTopic(subjectInfo.id, topic.id).length;
          return (
            <button
              key={topic.id}
              onClick={() => navigate(`/quiz/${subject}/${topic.id}`)}
              className="w-full bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover hover:scale-[1.01] transition-all text-left touch-target flex items-center gap-4"
            >
              <span className="text-3xl">{topic.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-card-foreground">{topic.name}</h3>
                <p className="text-sm text-muted-foreground">{questionCount} soru</p>
              </div>
              <span className="text-muted-foreground text-lg">→</span>
            </button>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}
