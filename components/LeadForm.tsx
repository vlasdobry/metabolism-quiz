import React, { useState } from 'react';
import { UserData } from '../types';
import { Button } from './Button';

interface LeadFormProps {
  onSubmit: (data: UserData) => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    // Basic phone validation (allows various formats, just checks length)
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Пожалуйста, введите корректный номер телефона');
      return;
    }
    onSubmit({ name, phone });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
      <div className="bg-emerald-600 p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Ваш результат готов!</h2>
        <p className="text-emerald-100 text-sm">
          Заполните форму ниже, чтобы узнать свой тип метаболизма и получить рекомендации.
        </p>
      </div>
      
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Ваше Имя
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Анна Иванова"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
              Номер телефона
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="+7 (999) 000-00-00"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth>
            Получить результат
          </Button>

          <p className="text-xs text-slate-400 text-center mt-4">
            Нажимая кнопку, вы даете согласие на обработку персональных данных.
          </p>
        </form>
      </div>
    </div>
  );
};