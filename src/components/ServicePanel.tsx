'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/types';
import { useProgressStore } from '@/store/progress';
import { X, CheckCircle, BookOpen, Zap, Brain, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import QuizModal from './QuizModal';

interface ServicePanelProps {
  service: Service | null;
  onClose: () => void;
  language: string;
}

export default function ServicePanel({ service, onClose, language }: ServicePanelProps) {
  const { progress, markServiceLearned, updateServiceConfidence } = useProgressStore();
  const [showQuiz, setShowQuiz] = useState(false);
  
  if (!service) return null;

  const serviceProgress = progress.serviceProgress[service.id];
  const isLearned = serviceProgress?.status !== 'new';
  const confidenceLevel = serviceProgress?.confidenceLevel || 0;

  const getStatusColor = () => {
    if (confidenceLevel >= 4) return 'bg-green-100 text-green-800 border-green-300';
    if (confidenceLevel >= 2) return 'bg-amber-100 text-amber-800 border-amber-300';
    if (isLearned) return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusText = () => {
    if (confidenceLevel >= 4) return 'Mastered';
    if (confidenceLevel >= 2) return 'In Review';
    if (isLearned) return 'Learning';
    return 'New';
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-200 z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>

          {/* Content */}
          <div className="h-full overflow-y-auto pb-24">
            <div className="p-6">
              {/* Service badge and name */}
              <div 
                className="inline-flex items-center px-3 py-1 rounded text-xs font-bold text-white mb-4"
                style={{ backgroundColor: service.visual.color }}
              >
                {service.category.toUpperCase()}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {service.abbreviation}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{service.fullName}</p>
              
              {serviceProgress && (
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {serviceProgress.correctAttempts}/{serviceProgress.totalAttempts} correct
                  </span>
                  <span>Streak: {serviceProgress.correctStreak}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 mb-8">
                {!isLearned && (
                  <button
                    onClick={() => markServiceLearned(service.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Mark as Learning
                  </button>
                )}
                <button
                  onClick={() => setShowQuiz(true)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Quick Quiz
                </button>
              </div>

              {/* What it does */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  What does it do?
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {service.description[language as keyof typeof service.description] || service.description.en}
                </p>
              </div>

              {/* Analogy */}
              <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
                  Analogy
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{service.analogy[language as keyof typeof service.analogy] || service.analogy.en}"
                </p>
              </div>

              {/* Exam Tips */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  For the Exam
                </h3>
                <ul className="space-y-2">
                  {service.examTips.slice(0, 4).map((tip, idx) => (
                    <li key={tip.key} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 mt-1">›</span>
                      <span>
                        {tip.content[language as keyof typeof tip.content] || tip.content.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Pricing Model
                </h3>
                <p className="text-sm text-gray-700">
                  {service.pricing[language as keyof typeof service.pricing] || service.pricing.en}
                </p>
              </div>

              {/* Connections */}
              {service.connections.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                    Related Services
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.connections.map(connId => (
                      <span 
                        key={connId}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full cursor-pointer transition-colors"
                      >
                        {connId.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Confidence slider */}
              {isLearned && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                    Confidence Level
                  </h3>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={confidenceLevel}
                      onChange={(e) => updateServiceConfidence(service.id, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-gray-700 w-8">
                      {confidenceLevel}/5
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {confidenceLevel === 1 && "Just starting to learn"}
                    {confidenceLevel === 2 && "Understanding basics"}
                    {confidenceLevel === 3 && "Comfortable with concepts"}
                    {confidenceLevel === 4 && "Ready for exam"}
                    {confidenceLevel === 5 && "Expert level"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          service={service}
          onClose={() => setShowQuiz(false)}
          language={language}
        />
      )}
    </>
  );
}
