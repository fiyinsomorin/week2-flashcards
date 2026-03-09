import './App.css'
import { useState } from 'react'

const flashcards = [
  {
    term: 'Stock',
    definition: 'A small piece of ownership in a company.',
    category: 'basics',
    image: '/business-concept-cartoon-businessman-take-more-profits-green-stock-market-graph-by-smartphone-vector.jpg',
  },
  {
    term: 'Share',
    definition: 'One unit of stock in a company.',
    category: 'basics',
    image: '/istockphoto-2198992647-612x612.jpg',
  },
  {
    term: 'Bull Market',
    definition: 'A market where prices are generally rising.',
    category: 'market',
    image: '/istockphoto-830763926-612x612.jpg',
  },
  {
    term: 'Bear Market',
    definition: 'A market where prices are generally falling.',
    category: 'market',
    image: '/image-1-jpg.webp',
  },
  {
    term: 'Portfolio',
    definition: 'The collection of investments a person owns.',
    category: 'basics',
    image: '/images.jpeg',
  },
  {
    term: 'Dividend',
    definition: 'Money a company pays to shareholders.',
    category: 'basics',
    image: '/G2CM_BI011_Backlog_Images_[Dividends]_V1b.webp',
  },
  {
    term: 'Volatility',
    definition: 'How much a price moves up and down.',
    category: 'risk',
    image: '/gettyimages-1572896426-612x612.jpg',
  },
  {
    term: 'Broker',
    definition: 'A platform or person that helps you buy and sell investments.',
    category: 'orders',
    image: '/images (1).jpeg',
  },
  {
    term: 'Limit Order',
    definition: 'An order to buy or sell at a specific price or better.',
    category: 'orders',
    image: '/Screenshot_2088.png',
  },
  {
    term: 'Stop Loss',
    definition: 'A preset price that helps limit losses by selling automatically.',
    category: 'risk',
    image: '/investor-stopping-loss-scissors-260nw-730333390.webp',
  },
]

function App() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentFlashcard = flashcards[currentCard]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNextCard = () => {
    let randomIndex = Math.floor(Math.random() * flashcards.length)

    while (randomIndex === currentCard) {
      randomIndex = Math.floor(Math.random() * flashcards.length)
    }

    setCurrentCard(randomIndex)
    setIsFlipped(false)
  }

  const handlePreviousCard = () => {
    const previousIndex = (currentCard - 1 + flashcards.length) % flashcards.length
    setCurrentCard(previousIndex)
    setIsFlipped(false)
  }

  const handleRightArrow = () => {
    const nextIndex = (currentCard + 1) % flashcards.length
    setCurrentCard(nextIndex)
    setIsFlipped(false)
  }

  return (
    <div className="app">
      <div className="flashcard-container">
        <h1>Retail Trading Flashcards</h1>
        <p>This is a collection of flashcards for retail trading.</p>
        <p>Total cards: {flashcards.length}</p>

        <div className="card-scene" onClick={handleFlip}>
          <div className={`card ${currentFlashcard.category} ${isFlipped ? 'is-flipped' : ''}`}>
            <div className="card-face card-front">
              {currentFlashcard.image && (
                <img
                  src={currentFlashcard.image}
                  alt={currentFlashcard.term}
                  className="card-image"
                />
              )}

              <p className="category-label">{currentFlashcard.category}</p>
              <h2>{currentFlashcard.term}</h2>
            </div>

            <div className="card-face card-back">
              {currentFlashcard.image && (
                <img
                  src={currentFlashcard.image}
                  alt={currentFlashcard.term}
                  className="card-image"
                />
              )}

              <p className="category-label">{currentFlashcard.category}</p>
              <h2>{currentFlashcard.definition}</h2>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={handlePreviousCard}>←</button>
          <button onClick={handleNextCard}>Random Card</button>
          <button onClick={handleRightArrow}>→</button>
        </div>
      </div>
    </div>
  )
}

export default App
