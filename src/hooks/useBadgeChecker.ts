import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ALL_BADGES, type BadgeDef } from '../data/badges';
import type { AnswerRecord } from '../context/GameContext';

interface CheckResult {
  newBadges: BadgeDef[];
}

export function useBadgeChecker() {
  const { user } = useAuth();

  const checkAndAwardBadges = useCallback(async (
    answers: AnswerRecord[],
    subject: string,
    quizTimeSeconds?: number,
  ): Promise<CheckResult> => {
    if (!user) return { newBadges: [] };

    // 1. Fetch current profile stats
    const { data: profile } = await supabase
      .from('profiles')
      .select('total_correct, total_wrong, streak, best_streak, total_score')
      .eq('user_id', user.id)
      .single();

    if (!profile) return { newBadges: [] };

    // 2. Fetch already earned badges
    const { data: earnedRows } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', user.id);

    const earnedIds = new Set((earnedRows || []).map(r => r.badge_id));

    // 3. Determine which badges to award
    const toAward: BadgeDef[] = [];
    const correct = answers.filter(a => a.correct).length;
    const total = answers.length;
    const isPerfect = correct === total && total > 0;

    // Helper: subject-specific correct count (from DB total, assume this quiz adds to it)
    const subjectCorrect = profile.total_correct; // total across all subjects

    // Subject milestone badges: bronz(10), demir(25), altin(50), usta(100), sampiyon(200), deha(500)
    const milestones: [number, string][] = [
      [10, `${subject}_bronz`],
      [25, `${subject}_demir`],
      [50, `${subject}_altin`],
      [100, `${subject}_usta`],
      [200, `${subject}_sampiyon`],
      [500, `${subject}_deha`],
    ];

    for (const [threshold, badgeId] of milestones) {
      if (subjectCorrect >= threshold && !earnedIds.has(badgeId)) {
        const badge = ALL_BADGES.find(b => b.id === badgeId);
        if (badge) toAward.push(badge);
      }
    }

    // Perfect quiz → subject mükemmelci + profesör
    if (isPerfect) {
      const perfId = `${subject}_mukemmel`;
      if (!earnedIds.has(perfId)) {
        const badge = ALL_BADGES.find(b => b.id === perfId);
        if (badge) toAward.push(badge);
      }
      if (!earnedIds.has('profesor')) {
        const badge = ALL_BADGES.find(b => b.id === 'profesor');
        if (badge) toAward.push(badge);
      }
    }

    // Streak badges
    if (profile.best_streak >= 5) {
      const seriId = `${subject}_seri`;
      if (!earnedIds.has(seriId)) {
        const badge = ALL_BADGES.find(b => b.id === seriId);
        if (badge) toAward.push(badge);
      }
    }
    if (profile.best_streak >= 10 && !earnedIds.has('seri_katil')) {
      const badge = ALL_BADGES.find(b => b.id === 'seri_katil');
      if (badge) toAward.push(badge);
    }

    // İlk adım (first quiz completed)
    if (!earnedIds.has('ilk_adim')) {
      const badge = ALL_BADGES.find(b => b.id === 'ilk_adim');
      if (badge) toAward.push(badge);
    }

    // Bilgi deposu (1000+ total answers)
    if ((profile.total_correct + profile.total_wrong) >= 1000 && !earnedIds.has('bilgi_deposu')) {
      const badge = ALL_BADGES.find(b => b.id === 'bilgi_deposu');
      if (badge) toAward.push(badge);
    }

    // 4. Insert new badges into DB
    if (toAward.length > 0) {
      const inserts = toAward.map(b => ({
        user_id: user.id,
        badge_id: b.id,
      }));
      await supabase.from('user_badges').insert(inserts);
    }

    return { newBadges: toAward };
  }, [user]);

  return { checkAndAwardBadges };
}
