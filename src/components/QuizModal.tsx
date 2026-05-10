'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service, QuizQuestion } from '@/types';
import { useProgressStore } from '@/store/progress';
import { X, CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

interface QuizModalProps {
  service: Service;
  onClose: () => void;
  language: string;
}

// Generate quiz questions based on service data
const generateQuestions = (service: Service): QuizQuestion[] => {
  const questions: QuizQuestion[] = [
    {
      id: `${service.id}_name_1`,
      type: 'multiple_choice',
      difficulty: 1,
      categories: [service.category],
      question: {
        en: `What does ${service.abbreviation} stand for?`,
        ro: `Ce înseamnă ${service.abbreviation}?`,
        es: `¿Qué significa ${service.abbreviation}?`,
        de: `Was bedeutet ${service.abbreviation}?`
      },
      options: generateNameOptions(service),
      correct: 1,
      explanation: {
        en: `${service.abbreviation} stands for ${service.fullName}.`,
        ro: `${service.abbreviation} înseamnă ${service.fullName}.`,
        es: `${service.abbreviation} significa ${service.fullName}.`,
        de: `${service.abbreviation} steht für ${service.fullName}.`
      },
      relatedServices: [service.id]
    },
    {
      id: `${service.id}_desc_1`,
      type: 'multiple_choice',
      difficulty: 2,
      categories: [service.category],
      question: service.description,
      options: generateDescriptionOptions(service),
      correct: 0,
      explanation: service.description,
      relatedServices: [service.id]
    },
    {
      id: `${service.id}_category_1`,
      type: 'multiple_choice',
      difficulty: 1,
      categories: ['general'],
      question: {
        en: `Which category does ${service.abbreviation} belong to?`,
        ro: `Din ce categorie face parte ${service.abbreviation}?`,
        es: `¿A qué categoría pertenece ${service.abbreviation}?`,
        de: `Zu welcher Kategorie gehört ${service.abbreviation}?`
      },
      options: generateCategoryOptions(service),
      correct: 0,
      explanation: {
        en: `${service.abbreviation} belongs to the ${service.category} category.`,
        ro: `${service.abbreviation} face parte din categoria ${service.category}.`,
        es: `${service.abbreviation} pertenece a la categoría ${service.category}.`,
        de: `${service.abbreviation} gehört zur Kategorie ${service.category}.`
      },
      relatedServices: [service.id]
    }
  ];

  // Add exam tip questions
  service.examTips.slice(0, 2).forEach((tip, idx) => {
    questions.push({
      id: `${service.id}_tip_${idx}`,
      type: 'multiple_choice',
      difficulty: 3,
      categories: [service.category, 'exam'],
      question: {
        en: `Exam Tip: ${tip.content.en}`,
        ro: `Pentru Examen: ${tip.content.ro || tip.content.en}`,
        es: `Consejo para el Examen: ${tip.content.es || tip.content.en}`,
        de: `Tipp für die Prüfung: ${tip.content.de || tip.content.en}`
      },
      options: [
        { en: 'True', ro: 'Adevărat', es: 'Verdadero', de: 'Wahr' },
        { en: 'False', ro: 'Fals', es: 'Falso', de: 'Falsch' }
      ],
      correct: 0,
      explanation: tip.content,
      relatedServices: [service.id]
    });
  });

  return questions;
};

// Helper functions to generate wrong options
function generateNameOptions(service: Service) {
  const parts = service.fullName.split(' ');
  const wrong1 = parts.slice().reverse().join(' ');
  const wrong2 = `AWS ${parts[0]} Cloud`;
  const wrong3 = `Elastic ${parts[1]} ${parts[2] || 'Service'}`;
  
  return [
    { en: wrong1, ro: wrong1, es: wrong1, de: wrong1 },
    { en: service.fullName, ro: service.fullName, es: service.fullName, de: service.fullName },
    { en: wrong2, ro: wrong2, es: wrong2, de: wrong2 },
    { en: wrong3, ro: wrong3, es: wrong3, de: wrong3 }
  ].sort(() => Math.random() - 0.5);
}

function generateDescriptionOptions(service: Service) {
  const genericDescriptions = [
    { en: 'A monitoring and logging service', ro: 'Un serviciu de monitorizare și logging', es: 'Un servicio de monitoreo y logging', de: 'Ein Monitoring- und Logging-Service' },
    { en: 'A security and identity service', ro: 'Un serviciu de securitate și identitate', es: 'Un servicio de seguridad e identidad', de: 'Ein Sicherheits- und Identitäts-Service' },
    service.description,
    { en: 'A billing and cost management service', ro: 'Un serviciu de facturare și gestionare costuri', es: 'Un servicio de facturación y gestión de costos', de: 'Ein Abrechnungs- und Kostenmanagement-Service' }
  ];
  return genericDescriptions.sort(() => Math.random() - 0.5);
}

function generateCategoryOptions(service: Service) {
  const categories = ['compute', 'storage', 'database', 'network', 'security', 'management'];
  const options = categories.slice(0, 4).map(cat => ({
    en: cat.charAt(0).toUpperCase() + cat.slice(1),
    ro: cat.charAt(0).toUpperCase() + cat.slice(1),
    es: cat.charAt(0).toUpperCase() + cat.slice(1),
    de: cat.charAt(0).toUpperCase() + cat.slice(1)
  }));
  
  // Ensure correct category is in options
  if (!categories.slice(0, 4).includes(service.category)) {
    options[0] = {
      en: service.category.charAt(0).toUpperCase() + service.category.slice(1),
      ro: service.category.charAt(0).toUpperCase() + service.category.slice(1),
      es: service.category.charAt(0).toUpperCase() + service.category.slice(1),
      de: service.category.charAt(0).toUpperCase() + service.category.slice(1)
    };
  }
  
  return options;
}

export default function QuizModal({ service, onClose, language }: QuizModalProps) {
  const [questions] = useState(() => generateQuestions(service));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  
  const { recordQuizAttempt, progress } = useProgressStore();

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    setAnswers(prev => [...prev, { questionId: currentQuestion.id, correct }]);
  };

  const handleNext = () => {
    recordQuizAttempt(service.id, isCorrect);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setAnswers([]);
    setIsFinished(false);
  };

  const correctCount = answers.filter(a => a.correct).length;
  const score = Math.round((correctCount / questions.length) * 100);

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
        >
          <div className="mb-6">
            {score >= 80 ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-green-600" />
              </div>
            ) : score >= 60 ? (
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-amber-600" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-10 h-10 text-red-600" />
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </h2>
            <p className="text-gray-600">
              You got {correctCount} out of {questions.length} correct ({score}%)
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm opacity-90">Question {currentIndex + 1} of {questions.length}</span>
            <button onClick={onClose} className="opacity-80 hover:opacity-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <div 
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
            />
          </div>
          <h3 className="text-lg font-semibold">
            {currentQuestion.question[language as keyof typeof currentQuestion.question] || currentQuestion.question.en}
          </h3>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {currentQuestion.options?.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectOption = idx === currentQuestion.correct;
            const showCorrectness = showResult && (isSelected || isCorrectOption);
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  showCorrectness
                    ? isCorrectOption
                      ? 'border-green-500 bg-green-50'
                      : isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                    : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    showCorrectness
                      ? isCorrectOption
                        ? 'bg-green-500 text-white'
                        : isSelected
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      : isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">
                    {option[language as keyof typeof option] || option.en}
                  </span>
                  {showCorrectness && isCorrectOption && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {showCorrectness && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 overflow-hidden"
            >
              <div className={`p-4 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct! ' : 'Not quite. '}
                  {currentQuestion.explanation[language as keyof typeof currentQuestion.explanation] || currentQuestion.explanation.en}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end">
          {showResult ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-sm text-gray-500">Select an answer</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
