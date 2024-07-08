import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import VideoReproductor from '../VideoReproductor/VideoReproductor';
import './Home.css';
import { TrailersContext } from '../../Context/TrailersContext';
import useConfig from '../Hooks/useConfig';

function Home() {
    const { URL_IMAGE } = useConfig();
    const { contentItems, selectedItem, trailer, selectItem } = useContext(TrailersContext);
    const [playing, setPlaying] = useState(false);

    return (
        <div className="container-home">
            <h1 className='text-center mb-2 title-home'>MOVIESFLIX</h1>
            {selectedItem && <VideoReproductor selectedItem={selectedItem} trailer={trailer} playing={playing} setPlaying={setPlaying} />}
           
            <MovieContainer items={contentItems} selectItem={(item) => selectItem(item, item.media_type || 'movie')} urlImage={URL_IMAGE} />
        </div>
    );
}

export default Home;
