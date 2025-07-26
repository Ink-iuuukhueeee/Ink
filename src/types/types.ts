
export interface VocabularyItem {
  kanji: string;
  furigana: string;
}

export type FeedbackState = 'idle' | 'correct' | 'incorrect';
