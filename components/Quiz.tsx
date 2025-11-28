import React from 'react';
import { Question } from '../types';
import { Button } from './Button';

interface QuizProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  onAnswer: (optionId: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({ question, currentStep, totalSteps, onAnswer }) => {
  const progress = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className="max-w-xl mx-auto w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
          <span>Вопрос {currentStep} из {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 leading-tight">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onAnswer(option.id)}
              className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-colors duration-200 group flex items-start"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-emerald-500 mr-4 mt-0.5 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-slate-700 font-medium group-hover:text-slate-900">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};