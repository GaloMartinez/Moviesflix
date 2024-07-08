import React, { useContext, useState } from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import VideoReproductor from '../VideoReproductor/VideoReproductor';
import './Series.css';
import { TrailersContext } from '../../Context/TrailersContext';
import useConfig from '../Hooks/useConfig';

function Series() {
    const { URL_IMAGE } = useConfig();
    const { series, selectedSeries, trailer, selectItem } = useContext(TrailersContext);
    const [playing, setPlaying] = useState(false);

    return (
        <div className="container-home">
            <h1 className='text-center mb-2 title-series'>Series Only</h1>
            {selectedSeries && <VideoReproductor selectedItem={selectedSeries} trailer={trailer} playing={playing} setPlaying={setPlaying} />}
            <MovieContainer items={series} selectItem={(item) => selectItem(item, 'tv')} urlImage={URL_IMAGE} />
        </div>
    );
}

export default Series;
