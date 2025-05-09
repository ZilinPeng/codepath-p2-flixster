
import MovieCard from './MovieCard';

export default function MovieList({ movies, onLoadMore, onSelect }) {
  return (
    <section className="movie-list">
      <div className="grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onSelect(movie)}
          />
        ))}
      </div>
      <div className="load-more-container">
        <button className="load-more" onClick={onLoadMore}>
          Load More
        </button>
      </div>
    </section>
  );
}
