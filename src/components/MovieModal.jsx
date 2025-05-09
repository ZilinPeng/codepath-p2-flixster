import ReactModal from 'react-modal';

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : '';

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

  return (
    <ReactModal
      isOpen={!!movie}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>
      <img src={backdropUrl} alt={movie.title + ' backdrop'} />
      <h2>{movie.title}</h2>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Runtime:</strong> {movie.runtime} min</p>
      <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
      <p>{movie.overview}</p>

      <div className="trailer">
        <h3>Watch Trailer</h3>
        {trailer ? (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available for this movie.</p>
        )}
      </div>
    </ReactModal>
  );
}