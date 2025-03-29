import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [view, setView] = useState('books'); 

  // fetch books when component loads
  useEffect(() => {
    fetch('https://seussology.info/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  // fetch quotes when quotes view is selected
  const fetchQuotes = () => {
    fetch('https://seussology.info/api/quotes/random/10')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuotes(data);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  };

  // handle selecting a book
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setView('details');
  };

  // handle going back to books list
  const goBackToBooks = () => {
    setView('books');
  };

  // handle going to quotes
  const handleViewQuotes = () => {
    fetchQuotes();
    setView('quotes');
  };

  return (
    <div className="App">
      <nav>
        <button onClick={goBackToBooks}>View Books</button>
        <button onClick={handleViewQuotes}>View Quotes</button>
      </nav>

      {view === 'books' && (
        <div>
          <h1>Seuss Treasury</h1>
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} onClick={() => handleBookClick(book)}>
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'details' && selectedBook && (
        <div>
          <button onClick={goBackToBooks}>Back to Books</button>
          <h1>{selectedBook.title}</h1>
          <img src={selectedBook.image} alt={selectedBook.title} />
          <p>{selectedBook.description}</p>
        </div>
      )}

      {view === 'quotes' && (
        <div>
          <button onClick={goBackToBooks}>Back to Books</button>
          <h1>Random Quotes</h1>
          <ul>
            {quotes.map((quote, index) => (
              <li key={index}>"{quote.text || quote.quote}" - {quote.book.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
