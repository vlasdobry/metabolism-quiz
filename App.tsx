import React, { useState } from 'react';
import { QUESTIONS } from './constants';
import { MetabolismType, AppState, UserData } from './types';
import { Quiz } from './components/Quiz';
import { LeadForm } from './components/LeadForm';
import { Result } from './components/Result';
import { Button } from './components/Button';
import { submitToGoogleSheets, recordMarathonClick } from './services/sheetsService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('INTRO');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultType, setResultType] = useState<MetabolismType | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleStartQuiz = () => {
    setAppState('QUIZ');
  };

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestionIndex].id]: optionId }));
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300); // Small delay for better UX
    } else {
      setAppState('LEAD_FORM');
    }
  };

  const calculateResult = (): { type: MetabolismType; score: number } => {
    const scores: Record<MetabolismType, number> = {
      [MetabolismType.INSULIN]: 0,
      [MetabolismType.THYROID]: 0,
      [MetabolismType.CORTISOL]: 0,
      [MetabolismType.HORMONAL]: 0,
      [MetabolismType.INFLAMMATORY]: 0,
    };

    QUESTIONS.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const option = q.options.find(opt => opt.id === selectedOptionId);
      if (option && option.impacts) {
        option.impacts.forEach(impact => {
          scores[impact.type] += impact.points;
        });
      }
    });

    // Find type with max score
    let maxScore = -1;
    let winner: MetabolismType = MetabolismType.INSULIN; // Default fallback

    (Object.keys(scores) as MetabolismType[]).forEach(type => {
      if (scores[type] > maxScore) {
        maxScore = scores[type];
        winner = type;
      }
    });

    return { type: winner, score: maxScore };
  };

  const handleFormSubmit = async (data: UserData) => {
    setUserData(data); // Save user data for later marathon registration
    setAppState('CALCULATING');
    const { type, score } = calculateResult();
    
    // Send data to backend/sheets
    await submitToGoogleSheets(data, type, score, answers);
    
    setResultType(type);
    setAppState('RESULT');
  };

  const handleMarathonRegistration = async () => {
    if (userData && userData.phone) {
      await recordMarathonClick(userData.phone);
    }
  };

  // --- RENDER CONTENT ---

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-6 px-4 font-sans text-slate-800 flex flex-col">
      {/* Header / Branding */}
      <header className="w-full text-center mb-8 animate-fade-in">
        <p className="text-xs md:text-sm font-bold text-emerald-700 uppercase tracking-widest opacity-90">
          Доктор без диет | Нутрициолог Оксана Федорова
        </p>
      </header>

      <main className="max-w-4xl mx-auto w-full flex-grow flex flex-col justify-center">
        
        {/* Intro Screen */}
        {appState === 'INTRO' && (
          <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
              Что блокирует ваш <span className="text-emerald-600">метаболизм?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Пройдите короткий тест, чтобы узнать свой метаболический тип и получить персональные рекомендации по восстановлению энергии и здоровья.
            </p>
            <Button onClick={handleStartQuiz} className="text-xl px-12 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Пройти тест
            </Button>
            <p className="text-sm text-slate-400 mt-8">
              Время прохождения: 60 секунд
            </p>
          </div>
        )}

        {/* Quiz Screen */}
        {appState === 'QUIZ' && (
          <Quiz 
            question={QUESTIONS[currentQuestionIndex]}
            currentStep={currentQuestionIndex + 1}
            totalSteps={QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        )}

        {/* Lead Form Screen */}
        {appState === 'LEAD_FORM' && (
          <div className="flex flex-col items-center justify-center">
             <LeadForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {/* Loading Screen */}
        {appState === 'CALCULATING' && (
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold text-slate-700">Анализируем ваши ответы...</h2>
          </div>
        )}

        {/* Result Screen */}
        {appState === 'RESULT' && resultType && (
          <Result 
            type={resultType} 
            onMarathonJoin={handleMarathonRegistration}
          />
        )}

      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs">
        <p>&copy; {new Date().getFullYear()} Доктор без диет. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default App;