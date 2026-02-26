// src/data/questionHelpers.ts

import { questions } from './questions';  // aşağıda export edeceğiz
import type { Question, Subject, TopicInfo } from '@/types'; // tiplerini nereden alıyorsan

export function getQuestionsBySubject(subject: Subject): Question[] {
  return questions.filter(q => q.subject === subject);
}

export function getQuestionsByTopic(subject: Subject, topic: string): Question[] {
  return questions.filter(q => q.subject === subject && q.topic === topic);
}

export function getQuestionsByDifficulty(subject: Subject, topic: string, difficulty: string): Question[] {
  return questions.filter(q => q.subject === subject && q.topic === topic && q.difficulty === difficulty);
}

export function getRandomQuestions(subject: Subject, count: number = 10, topic?: string, difficulty?: string): Question[] {
  let pool = questions.filter(q => q.subject === subject);
  if (topic) pool = pool.filter(q => q.topic === topic);
  if (difficulty) pool = pool.filter(q => q.difficulty === difficulty);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getTopicsForSubject(subject: Subject): TopicInfo[] {
  return SUBJECTS.find(s => s.id === subject)?.topics || [];
}
