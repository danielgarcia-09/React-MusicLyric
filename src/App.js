import { useState, Fragment, useEffect } from "react";
import "./index.css";
import Form from "./components/Form";
import axios from "axios";
import Error from "./components/Error";
import Song from "./components/Song";
import Spinner from "./components/Spinner";
import Artist from "./components/Artist";

function App() {
  //* main state
  const [searchLyric, setSearchLyric] = useState({});

  //* lyrics state
  const [lyrics, saveLyrics] = useState("");

  //* artist state
  const [artist, saveArtist] = useState({});

  //* loading state
  const [loading, setLoading] = useState(false);

  //! error state
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(searchLyric).length === 0) return;

    const lyricAndArtistAPI = async () => {
      const { artista, cancion } = searchLyric;

      try {
        setError(false);
        setLoading(true);
        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
        const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

        const [lyricResponse, artistResponse] = await Promise.all([
          axios(url),
          axios(url2),
        ]);

        setLyrics(lyricResponse);
        setArtist(artistResponse);

        stopLoading();
      } catch (err) { catchError() }
    };
    lyricAndArtistAPI();
  }, [searchLyric]);

  const setLyrics = async (resp) => {
    const { data } = resp;
    const lyrics = data.lyrics;
    saveLyrics(lyrics);
  };

  const setArtist = async (resp) => {
    const { data } = resp;
    const artist = data.artists[0];
    saveArtist(artist);
  };

  const stopLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const catchError = () => {
    saveLyrics('');
    saveArtist({});
    setLoading(false);
    setError(true);
    console.clear();
  };

  return (
    <Fragment>
      <Form mainError={error} setSearchLyric={setSearchLyric} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            {loading ? <Spinner /> : <Artist artist={artist} />}
          </div>
          <div className="col-md-6">
            {loading ? <Spinner /> : <Song lyrics={lyrics} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
