import { useCallback, useEffect, useState } from "react"
import type { VocabularyItem } from "../types/types"
import { vocabularyData } from "../data/vocabulary";

// Fisher-Yates shuffle algorithm
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

export const useVocabulary = () => {
  const [cards, setCards] = useState<VocabularyItem[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const startNewRound = useCallback(() => {
    setCards(shuffle([...vocabularyData]))
    setCurrentIndex(0)
  }, [])

  useEffect(() => {
    startNewRound()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const advanceToNextCard = useCallback(() => {
    if (currentIndex === cards.length - 1) startNewRound()
    else setCurrentIndex((prev) => prev + 1)


  }, [currentIndex, cards.length, startNewRound])

  const checkAnswer = (input: string): boolean => {
    if (cards.length === 0) return false;
    return input.trim() === cards[currentIndex].furigana
  }

  return {
    currentCard: cards.length > 0 ? cards[currentIndex] : null,
    totalCards: cards.length,
    currentCardNumber: currentIndex + 1,
    checkAnswer,
    advanceToNextCard
  }
}