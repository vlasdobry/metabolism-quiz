import React, { useState } from 'react';
import { MetabolismType } from '../types';
import { RESULTS, TELEGRAM_BOT_URL } from '../constants';
import { Button } from './Button';

interface ResultProps {
  type: MetabolismType;
  onMarathonJoin: () => void;
}

export const Result: React.FC<ResultProps> = ({ type, onMarathonJoin }) => {
  const content = RESULTS[type];
  const [hasJoined, setHasJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMarathonClick = async () => {
    setIsLoading(true);
    
    // 1. Send data to Google Sheets (record participation)
    await onMarathonJoin();
    
    // 2. Show brief success state
    setHasJoined(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // 3. Redirect to Telegram
      window.location.href = TELEGRAM_BOT_URL;
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-8">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-emerald-500">
        <div className="p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">Ваш тип метаболизма</p>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </span>
          Комментарий эксперта нутрициолога Оксана Федоровой
        </h3>
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 relative group">
           {/* Placeholder for iframe. */}
           <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/5qap5aO4i9A" 
            title="Metabolism Explanation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Хотите восстановить метаболизм?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg max-w-lg mx-auto">
            Примите участие в бесплатном 3-дневном марафоне, где мы детально разберем ваше питание и гормоны.
          </p>
          
          <Button 
            variant="secondary" 
            onClick={handleMarathonClick}
            disabled={isLoading || hasJoined}
            className="mx-auto text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full md:w-auto flex items-center justify-center gap-2"
          >
            {isLoading || hasJoined ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Переход в Telegram...
              </>
            ) : (
              "Участвовать в марафоне"
            )}
          </Button>
          <p className="text-xs text-emerald-200 mt-3 opacity-70">
            Вы будете перенаправлены на бота Доктор без диет
          </p>
        </div>
      </div>
    </div>
  );
};