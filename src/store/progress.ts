import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, UserProgress } from '@/types';

interface ProgressState {
  progress: UserProgress;
  markServiceLearned: (serviceId: string) => void;
  updateServiceConfidence: (serviceId: string, level: number) => void;
  recordQuizAttempt: (serviceId: string, correct: boolean) => void;
  getStreak: () => number;
  getTotalLearned: () => number;
  getMasteryPercentage: (totalServices: number) => number;
  /** Last N quiz question IDs the user has seen (ring buffer, ~50 entries). */
  recentlySeenQuestions: string[];
  /** Mark a list of question IDs as seen, trimming buffer to MAX. */
  markQuestionsSeen: (ids: string[]) => void;

  /** The most recent daily challenge result, if any. */
  dailyChallenge: { date: string; correct: number; total: number } | null;
  /** Record completion of today's daily challenge. */
  recordDailyChallenge: (date: string, correct: number, total: number) => void;

  /** IDs of questions the user has bookmarked for later review. */
  bookmarkedQuestions: string[];
  /** Toggle bookmark on/off for a question. */
  toggleBookmark: (questionId: string) => void;

  /**
   * Counts how many times user got each question wrong.
   * Resets to 0 when answered correctly. Used to power "Mistakes" review mode.
   */
  wrongAnswerCounts: Record<string, number>;
  /** Record one wrong answer (increments counter). */
  recordWrongAnswer: (questionId: string) => void;
  /** Clear wrong-answer counter (when user finally gets it right). */
  clearWrongAnswer: (questionId: string) => void;
}

const initialProgress: UserProgress = {
  userId: 'local-user',
  streak: {
    current: 0,
    longest: 0,
    lastActivity: new Date().toISOString()
  },
  totalXp: 0,
  serviceProgress: {}
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      markServiceLearned: (serviceId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            serviceProgress: {
              ...state.progress.serviceProgress,
              [serviceId]: {
                status: 'learning',
                confidenceLevel: 1,
                nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                reviewCount: 0,
                correctStreak: 0,
                totalAttempts: 0,
                correctAttempts: 0
              }
            },
            streak: updateStreak(state.progress.streak)
          }
        }));
      },

      updateServiceConfidence: (serviceId: string, level: number) => {
        set((state) => {
          const currentProgress = state.progress.serviceProgress[serviceId];
          if (!currentProgress) return state;

          return {
            progress: {
              ...state.progress,
              serviceProgress: {
                ...state.progress.serviceProgress,
                [serviceId]: {
                  ...currentProgress,
                  confidenceLevel: level,
                  status: level >= 4 ? 'mastered' : level >= 2 ? 'review' : 'learning'
                }
              }
            }
          };
        });
      },

      recordQuizAttempt: (serviceId: string, correct: boolean) => {
        set((state) => {
          const currentProgress = state.progress.serviceProgress[serviceId] || {
            status: 'new',
            confidenceLevel: 0,
            nextReview: new Date().toISOString(),
            reviewCount: 0,
            correctStreak: 0,
            totalAttempts: 0,
            correctAttempts: 0
          };

          const newCorrectStreak = correct ? currentProgress.correctStreak + 1 : 0;
          const newConfidence = Math.min(5, Math.max(1, 
            currentProgress.confidenceLevel + (correct ? 1 : -1)
          ));

          return {
            progress: {
              ...state.progress,
              serviceProgress: {
                ...state.progress.serviceProgress,
                [serviceId]: {
                  ...currentProgress,
                  correctStreak: newCorrectStreak,
                  confidenceLevel: newConfidence,
                  totalAttempts: currentProgress.totalAttempts + 1,
                  correctAttempts: currentProgress.correctAttempts + (correct ? 1 : 0),
                  status: newConfidence >= 4 ? 'mastered' : newConfidence >= 2 ? 'review' : 'learning',
                  nextReview: calculateNextReview(currentProgress, correct)
                }
              },
              totalXp: state.progress.totalXp + (correct ? 10 : 2),
              streak: updateStreak(state.progress.streak)
            }
          };
        });
      },

      getStreak: () => get().progress.streak.current,
      getTotalLearned: () => Object.values(get().progress.serviceProgress).filter(p => p.status !== 'new').length,
      getMasteryPercentage: (totalServices: number) => {
        const mastered = Object.values(get().progress.serviceProgress).filter(p => p.status === 'mastered').length;
        return Math.round((mastered / totalServices) * 100);
      },

      dailyChallenge: null,
      recordDailyChallenge: (date: string, correct: number, total: number) => {
        set({ dailyChallenge: { date, correct, total } });
      },

      bookmarkedQuestions: [],
      toggleBookmark: (questionId: string) => {
        set((state) => {
          const has = state.bookmarkedQuestions.includes(questionId);
          return {
            bookmarkedQuestions: has
              ? state.bookmarkedQuestions.filter((id) => id !== questionId)
              : [...state.bookmarkedQuestions, questionId],
          };
        });
      },

      wrongAnswerCounts: {},
      recordWrongAnswer: (questionId: string) => {
        set((state) => ({
          wrongAnswerCounts: {
            ...state.wrongAnswerCounts,
            [questionId]: (state.wrongAnswerCounts[questionId] ?? 0) + 1,
          },
        }));
      },
      clearWrongAnswer: (questionId: string) => {
        set((state) => {
          if (!state.wrongAnswerCounts[questionId]) return {};
          const next = { ...state.wrongAnswerCounts };
          delete next[questionId];
          return { wrongAnswerCounts: next };
        });
      },

      recentlySeenQuestions: [],
      markQuestionsSeen: (ids: string[]) => {
        const MAX_BUFFER = 50;
        set((state) => {
          // Newest first; dedupe; cap at MAX
          const merged = [...ids, ...state.recentlySeenQuestions].filter(
            (id, idx, arr) => arr.indexOf(id) === idx,
          );
          return { recentlySeenQuestions: merged.slice(0, MAX_BUFFER) };
        });
      },
    }),
    {
      name: 'aws-learning-progress',
      version: 4,
      migrate: (persistedState, fromVersion) => {
        let state = (persistedState ?? {}) as Partial<ProgressState>;
        if (fromVersion < 2) {
          state = { ...state, recentlySeenQuestions: [] };
        }
        if (fromVersion < 3) {
          state = { ...state, dailyChallenge: null };
        }
        if (fromVersion < 4) {
          state = { ...state, bookmarkedQuestions: [], wrongAnswerCounts: {} };
        }
        return state as ProgressState;
      },
    },
  ),
);

function updateStreak(streak: UserProgress['streak']): UserProgress['streak'] {
  const lastActivity = new Date(streak.lastActivity);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = lastActivity.toDateString() === today.toDateString();
  const isYesterday = lastActivity.toDateString() === yesterday.toDateString();

  if (isToday) {
    return streak;
  } else if (isYesterday) {
    return {
      current: streak.current + 1,
      longest: Math.max(streak.longest, streak.current + 1),
      lastActivity: today.toISOString()
    };
  } else {
    return {
      current: 1,
      longest: streak.longest,
      lastActivity: today.toISOString()
    };
  }
}

function calculateNextReview(progress: UserProgress['serviceProgress'][string], correct: boolean): string {
  const intervals = [1, 3, 7, 14, 30]; // days
  const currentIntervalIndex = Math.min(progress.reviewCount, intervals.length - 1);
  const nextInterval = correct 
    ? intervals[currentIntervalIndex] 
    : 1; // Reset to 1 day if wrong

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + nextInterval);
  return nextDate.toISOString();
}
