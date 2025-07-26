import { useCallback, useState } from 'react'
import './App.css'
import { useVocabulary } from './hooks/useVocabulary'
import type { FeedbackState } from './types/types'
import Flashcard from './components/Flashcard'

function App() {
  const {
    currentCard,
    totalCards,
    currentCardNumber,
    checkAnswer,
    advanceToNextCard
  } = useVocabulary()
  const [userInput, setUserInput] = useState('')
  const [feedback, setFeedback] = useState<FeedbackState>('idle')
  const [showAnswer, setShowAnswer] = useState(false)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInput(e.target.value)
      if (feedback !== 'idle') {
        setFeedback('idle')
        setShowAnswer(false)
      }
    },
    [feedback]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!userInput.trim() || feedback === 'correct') return

      if (checkAnswer(userInput)) {
        setFeedback('correct')
        setShowAnswer(false)
        setTimeout(() => {
          advanceToNextCard()
          setUserInput('')
          setFeedback('idle')
        }, 1200)
      } else {
        setFeedback('incorrect')
        setShowAnswer(true)
        setUserInput('')
      }
    },
    [userInput, checkAnswer, advanceToNextCard, feedback]
  )

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading vocabulary...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
          Japanese Flashcards
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Test your vocabulary knowledge
        </p>
      </header>

      <main className="w-full">
        <Flashcard
          kanji={currentCard.kanji}
          furigana={currentCard.furigana}
          userInput={userInput}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          feedback={feedback}
          showAnswer={showAnswer}
        />
      </main>

      <footer className="mt-8 text-center">
        <div className="w-full max-w-md mx-auto">
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Card {currentCardNumber} of {totalCards}
          </p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentCardNumber / totalCards) * 100}%` }}
            ></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
