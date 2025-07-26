import { useRef } from 'react'
import type { FeedbackState } from '../types/types'
import { IconCheck, IconX } from '../constants/constants'

interface FlashcardProps {
  kanji: string
  furigana: string
  userInput: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  feedback: FeedbackState
  showAnswer: boolean
}

const Flashcard: React.FC<FlashcardProps> = ({
  kanji,
  furigana,
  userInput,
  onInputChange,
  onSubmit,
  feedback,
  showAnswer
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const feedbackBorderColor =
    feedback === 'correct'
      ? 'border-green-400'
      : feedback === 'incorrect'
        ? 'border-red-400'
        : 'border-slate-300 dark:border-slate-600'

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg transition-all duration-300 transform ${feedback === 'correct' ? 'scale-105' : ''} ${feedback === 'incorrect' ? 'animate-shake' : ''}`}
      >
        <div className="p-8 text-center">
          <p
            className="text-6xl md:text-7xl font-bold text-slate-800 dark:text-slate-100 mb-6 min-h-[88px]"
            lang="ja"
          >
            {kanji}
          </p>
          <form onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              lang="ja"
              placeholder="Enter reading (ひらがな)"
              value={userInput}
              onChange={onInputChange}
              disabled={feedback === 'correct'}
              className={`w-full px-4 py-3 text-lg text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border-2 ${feedbackBorderColor} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-300`}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
            <button
              type="submit"
              disabled={feedback === 'correct'}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:cursor-not-allowed"
            >
              Check
            </button>
          </form>
          <div className="mt-4 min-h-[56px] flex items-center justify-center">
            {feedback === 'correct' && (
              <div className="flex items-center text-green-500 dark:text-green-400 animate-fade-in">
                <IconCheck className="w-8 h-8 mr-2" />
                <span className="text-xl font-semibold">Correct!</span>
              </div>
            )}
            {feedback === 'incorrect' && showAnswer && (
              <div className="flex items-center text-red-500 dark:text-red-400 animate-fade-in">
                <IconX className="w-8 h-8 mr-2" />
                <span className="text-xl font-semibold">{furigana}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Flashcard
