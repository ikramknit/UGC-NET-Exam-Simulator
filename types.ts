export type Language = 'en' | 'hi';

export interface LocalizedText {
  en: string;
  hi: string;
}

export interface Question {
  question: LocalizedText;
  options: LocalizedText[];
  answer: number;
}

export enum QuestionStatus {
  NotVisited,
  NotAnswered,
  Answered,
  MarkedForReview,
  AnsweredAndMarkedForReview,
}

export enum ExamState {
  Start,
  Loading,
  Ongoing,
  Submitted,
}
