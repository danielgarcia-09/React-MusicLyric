const Artist = ({ artist }) => {
  if (Object.keys(artist).length === 0) return null;

  const { strArtistThumb, strGenre, strBiographyEN, strBiographyES } = artist;
  return (
    <div className="card">
      <div className="card-header bg-primary text-light font-weight-bold">
        Info sobre Artista
      </div>
      <div className="card-body">
        <img src={strArtistThumb} alt="Logo Artista" />
        <p className="card-text">Genero: {strGenre}</p>
        <h2 className="card-text">Biografia: </h2>
        <p className="card-text">{strBiographyES || strBiographyEN}</p>
        <p className="card-text">
          <a
            href={`https://${artist.strFacebook}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href={`https://${artist.strTwitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href={`${artist.strLastFMChart}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-lastfm"></i>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Artist;
