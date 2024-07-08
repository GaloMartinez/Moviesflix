import React, { useContext, useState } from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import VideoReproductor from '../VideoReproductor/VideoReproductor';
import './Movies.css';
import { TrailersContext } from '../../Context/TrailersContext';
import useConfig from '../Hooks/useConfig';

function Movies() {
    const { URL_IMAGE } = useConfig();
    const { movies, selectedMovie, trailer, selectItem } = useContext(TrailersContext);
    const [playing, setPlaying] = useState(false);

    return (
        <div className="container-home">
            <h1 className='text-center mb-2 title-movies'>Movies Only</h1>
            {selectedMovie && <VideoReproductor selectedItem={selectedMovie} trailer={trailer} playing={playing} setPlaying={setPlaying} />}
            <MovieContainer items={movies} selectItem={(item) => selectItem(item, 'movie')} urlImage={URL_IMAGE} />
        </div>
    );
}

export default Movies;