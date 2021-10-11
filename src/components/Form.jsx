import { useState } from "react";
import Error from "./Error";

const Form = ({ mainError, setSearchLyric }) => {
  const [search, setSearch] = useState({
    artista: "",
    cancion: "",
  });

  const [error, setError] = useState(false);

  const { artista, cancion } = search;

  //* Func to read input content
  const updateState = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  //* Consulting APIS
  const searchInfo = (e) => {
    e.preventDefault();

    if (artista.trim() === "" || cancion.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    //* giving value to main state in app.js
    setSearchLyric(search);
  };

  return (
    <div className="bg-info">
      {mainError ? <Error message="Cancion o artista incorrecto" /> : null}
      {error ? <Error message="Todos los campos son obligatorios" /> : null}
      <div className="container">
        <div className="row">
          <form
            onSubmit={searchInfo}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      placeholder="Nombre Artista"
                      onChange={updateState}
                      value={artista}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Cancion</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cancion"
                    placeholder="Nombre Cancion"
                    onChange={updateState}
                    value={cancion}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary float-right">
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
