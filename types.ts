export enum MetabolismType {
  INSULIN = 'INSULIN',
  THYROID = 'THYROID',
  CORTISOL = 'CORTISOL',
  HORMONAL = 'HORMONAL',
  INFLAMMATORY = 'INFLAMMATORY',
}

export interface ScoreImpact {
  type: MetabolismType;
  points: number;
}

export interface Option {
  id: string;
  text: string;
  impacts: ScoreImpact[];
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface UserData {
  name: string;
  phone: string;
}

export interface ResultContent {
  title: string;
  description: string;
  videoUrl: string; // Placeholder for the Oksana video
}

export type AppState = 'INTRO' | 'QUIZ' | 'LEAD_FORM' | 'CALCULATING' | 'RESULT';