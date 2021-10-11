import { Fragment } from "react";

const Song = ({lyrics}) => (lyrics.length === 0) ? null : (
    <Fragment>
        <h2>Letra Cancion:</h2>
        <p className="letra">{lyrics}</p>
    </Fragment>
) ;
export default Song;