import { useState, useEffect, useMemo } from 'react';
import {
  fetchNowPlaying,
  searchMovies,
  fetchMovieDetails
} from './api/tmdb';
import Header from './components/Header';
import Banner from './components/Banner';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [modalMovie, setModalMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async (nextPage = page, customQuery = query) => {
    setLoading(true);
    const data = customQuery
      ? await searchMovies(customQuery, nextPage)
      : await fetchNowPlaying(nextPage);

    setMovies(prev =>
      nextPage === 1 ? data.results : [...prev, ...data.results]
    );
    setPage(nextPage);
    setLoading(false);
  };

  const handleSearch = (q) => {
    setQuery(q);
    loadMovies(1, q);
  };

  const clearSearch = () => {
    setQuery('');
    loadMovies(1, '');
  };

  const sortedMovies = useMemo(() => {
    if (!sortBy) return movies;
    const copy = [...movies];
    if (sortBy === 'title') return copy.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'date') return copy.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    if (sortBy === 'rating') return copy.sort((a, b) => b.vote_average - a.vote_average);
    return copy;
  }, [movies, sortBy]);

  const openModal = async (movie) => {
    const full = await fetchMovieDetails(movie.id);
    setModalMovie(full);
  };

  const closeModal = () => setModalMovie(null);

  return (
    <>
      <Header
        onSearch={handleSearch}
        onClear={clearSearch}
        query={query}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <Banner />
      <main>
        {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
        <MovieList
          movies={sortedMovies}
          onLoadMore={() => loadMovies(page + 1)}
          onSelect={openModal}
        />
        {modalMovie && (
          <MovieModal movie={modalMovie} onClose={closeModal} />
        )}

      </main>
      <footer>
        <div className="footer-columns">
          <div className="footer-section"><About /></div>
          <div className="footer-section"><Contact /></div>
        </div>
        <div className="footer-bottom"><Footer /></div>
      </footer>
    </>
  );
}