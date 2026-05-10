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
      }
    }),
    {
      name: 'aws-learning-progress',
      version: 1
    }
  )
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
