import { useMemo, useState } from 'react'
import './App.css'

const flashcards = [
  {
    id: 1,
    term: 'Stock',
    definition: 'A small piece of ownership in a company.',
    category: 'basics',
    image: '/business-concept-cartoon-businessman-take-more-profits-green-stock-market-graph-by-smartphone-vector.jpg',
  },
  {
    id: 2,
    term: 'Share',
    definition: 'One unit of stock in a company.',
    category: 'basics',
    image: '/istockphoto-2198992647-612x612.jpg',
  },
  {
    id: 3,
    term: 'Bull Market',
    definition: 'A market where prices are generally rising.',
    category: 'market',
    image: '/istockphoto-830763926-612x612.jpg',
  },
  {
    id: 4,
    term: 'Bear Market',
    definition: 'A market where prices are generally falling.',
    category: 'market',
    image: '/image-1-jpg.webp',
  },
  {
    id: 5,
    term: 'Portfolio',
    definition: 'The collection of investments a person owns.',
    category: 'basics',
    image: '/images.jpeg',
  },
  {
    id: 6,
    term: 'Dividend',
    definition: 'Money a company pays to shareholders.',
    category: 'basics',
    image: '/G2CM_BI011_Backlog_Images_[Dividends]_V1b.webp',
  },
  {
    id: 7,
    term: 'Volatility',
    definition: 'How much a price moves up and down.',
    category: 'risk',
    image: '/gettyimages-1572896426-612x612.jpg',
  },
  {
    id: 8,
    term: 'Broker',
    definition: 'A platform or person that helps you buy and sell investments.',
    category: 'orders',
    image: '/images (1).jpeg',
  },
  {
    id: 9,
    term: 'Limit Order',
    definition: 'An order to buy or sell at a specific price or better.',
    category: 'orders',
    image: '/Screenshot_2088.png',
  },
  {
    id: 10,
    term: 'Stop Loss',
    definition: 'A preset price that helps limit losses by selling automatically.',
    category: 'risk',
    image: '/investor-stopping-loss-scissors-260nw-730333390.webp',
  },
]

const normalizeText = (text) =>
  text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim()

const isAnswerMatch = (guess, answer) => {
  const cleanGuess = normalizeText(guess)
  const cleanAnswer = normalizeText(answer)

  if (!cleanGuess) return false
  if (cleanGuess === cleanAnswer) return true
  if (cleanGuess.length >= 3 && cleanAnswer.includes(cleanGuess)) return true
  if (cleanAnswer.length >= 3 && cleanGuess.includes(cleanAnswer)) return true

  return false
}

const shuffleArray = (array) => {
  const shuffled = [...array]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled
}

function App() {
  const [cardOrder, setCardOrder] = useState(flashcards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [masteredIds, setMasteredIds] = useState([])

  const activeCards = useMemo(
    () => cardOrder.filter((card) => !masteredIds.includes(card.id)),
    [cardOrder, masteredIds],
  )

  const boundedIndex =
    activeCards.length === 0 ? 0 : Math.min(currentIndex, activeCards.length - 1)

  const currentCard = activeCards[boundedIndex] ?? null
  const masteredCards = flashcards.filter((card) => masteredIds.includes(card.id))

  const resetCardState = () => {
    setIsFlipped(false)
    setGuess('')
    setFeedback(null)
  }

  const handleFlip = () => {
    if (!currentCard) return
    setIsFlipped((prev) => !prev)
  }

  const handleGuessChange = (event) => {
    setGuess(event.target.value)
    if (feedback) {
      setFeedback(null)
    }
  }

  const handleSubmitGuess = (event) => {
    event.preventDefault()

    if (!currentCard) return

    const isCorrect = isAnswerMatch(guess, currentCard.definition)

    if (isCorrect) {
      const nextStreak = currentStreak + 1
      setFeedback('correct')
      setCurrentStreak(nextStreak)
      setLongestStreak((prev) => Math.max(prev, nextStreak))
    } else {
      setFeedback('incorrect')
      setCurrentStreak(0)
    }
  }

  const handleNext = () => {
    if (boundedIndex >= activeCards.length - 1) return
    setCurrentIndex((prev) => prev + 1)
    resetCardState()
  }

  const handlePrevious = () => {
    if (boundedIndex <= 0) return
    setCurrentIndex((prev) => prev - 1)
    resetCardState()
  }

  const handleShuffle = () => {
    setCardOrder((prev) => shuffleArray(prev))
    setCurrentIndex(0)
    resetCardState()
  }

  const handleMasterCard = () => {
    if (!currentCard) return

    setMasteredIds((prev) => [...prev, currentCard.id])
    setCurrentStreak(0)
    resetCardState()
  }

  const isAtStart = boundedIndex === 0
  const isAtEnd = boundedIndex === activeCards.length - 1

  return (
    <div className="app">
      <div className="flashcard-container">
        <p className="eyebrow">Week 3 Project</p>
        <h1>Retail Trading Flashcards</h1>
        <p className="description">
          Study trading vocabulary, type your guess, and track your streak.
        </p>

        <div className="stats-row">
          <div className="stat-card">
            <span>Cards Left</span>
            <strong>{activeCards.length}</strong>
          </div>
          <div className="stat-card">
            <span>Current Streak</span>
            <strong>{currentStreak}</strong>
          </div>
          <div className="stat-card">
            <span>Longest Streak</span>
            <strong>{longestStreak}</strong>
          </div>
        </div>

        {currentCard ? (
          <>
            <p className="progress-label">
              Card {boundedIndex + 1} of {activeCards.length}
            </p>

            <div className="form-card">
              <label htmlFor="guess-input" className="input-label">
                Enter your guess for the definition
              </label>

              <form className="guess-form" onSubmit={handleSubmitGuess}>
                <input
                  id="guess-input"
                  type="text"
                  value={guess}
                  onChange={handleGuessChange}
                  placeholder="Type the definition here"
                />
                <button type="submit">Submit</button>
              </form>

              <p className={`feedback-message ${feedback ?? ''}`}>
                {feedback === 'correct' && 'Correct answer.'}
                {feedback === 'incorrect' && 'Not quite. Try again or flip the card.'}
                {!feedback && 'Answers use fuzzy matching: capitalization and punctuation are ignored.'}
              </p>
            </div>

            <div className="card-scene" onClick={handleFlip}>
              <div
                className={`card ${currentCard.category} ${isFlipped ? 'is-flipped' : ''} ${
                  feedback ?? ''
                }`}
              >
                <div className="card-face card-front">
                  {currentCard.image && (
                    <img
                      src={currentCard.image}
                      alt={currentCard.term}
                      className="card-image"
                    />
                  )}
                  <p className="category-label">{currentCard.category}</p>
                  <h2>{currentCard.term}</h2>
                  <p className="card-hint">Click to flip</p>
                </div>

                <div className="card-face card-back">
                  {currentCard.image && (
                    <img
                      src={currentCard.image}
                      alt={currentCard.term}
                      className="card-image"
                    />
                  )}
                  <p className="category-label">{currentCard.category}</p>
                  <h2>{currentCard.definition}</h2>
                  <p className="card-hint">Click to return</p>
                </div>
              </div>
            </div>

            <div className="button-container">
              <button onClick={handlePrevious} disabled={isAtStart}>
                ← Previous
              </button>
              <button onClick={handleShuffle}>Shuffle</button>
              <button onClick={handleMasterCard}>Mark Mastered</button>
              <button onClick={handleNext} disabled={isAtEnd}>
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h2>All cards mastered</h2>
            <p>You have removed every card from the active study deck.</p>
            <button
              onClick={() => {
                setMasteredIds([])
                setCardOrder(flashcards)
                setCurrentIndex(0)
                resetCardState()
              }}
            >
              Reset Deck
            </button>
          </div>
        )}

        {masteredCards.length > 0 && (
          <div className="mastered-section">
            <h3>Mastered Cards</h3>
            <div className="mastered-list">
              {masteredCards.map((card) => (
                <span key={card.id} className="mastered-chip">
                  {card.term}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
