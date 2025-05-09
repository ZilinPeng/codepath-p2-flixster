import { useState } from 'react';

export default function MovieCard({ movie, onClick }) {
  const [favorited, setFavorited] = useState(false);
  const [watched, setWatched] = useState(false);

  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : '/fallback.jpg';

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent modal opening
    setFavorited((prev) => !prev);
  };

  const toggleWatched = (e) => {
    e.stopPropagation(); // Prevent modal opening
    setWatched((prev) => !prev);
  };

  return (
    <article
      className="movie-card"
      role="listitem"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="poster-container">
        <img src={imgUrl} alt={`Poster for ${movie.title}`} loading="lazy" />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="info-footer">
          <p>{movie.vote_average.toFixed(1)} ★</p>
          <div className="action-buttons">
            <button
              className={`icon-btn favorite-btn ${favorited ? 'favorited' : ''}`}
              onClick={toggleFavorite}
              aria-label="Toggle favorite"
            >
              ♥
            </button>
            <button
              className={`icon-btn watch-btn ${watched ? 'watched' : ''}`}
              onClick={toggleWatched}
              aria-label="Toggle watched"
            >
              {watched ? '👀' : '😌'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}