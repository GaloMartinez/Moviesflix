import React, { useContext } from 'react';
import './VideoReproductor.css';
import YouTube from 'react-youtube';
import useConfig from '../Hooks/useConfig';
import useTrailers from '../Hooks/useTrailers';

function VideoReproductor({ selectedItem, trailer, playing, setPlaying }) {
    const { IMAGE_PATH } = useConfig();
    // console.log(trailer);
    // console.log(selectedItem);
    return (
        <div>
            {selectedItem ? (
                <div
                    className="viewTrailer mb-3"
                    style={{ backgroundImage: `url("${IMAGE_PATH}${selectedItem.backdrop_path}")` }}
                >
                    {playing && trailer ? (
                        <>
                            <YouTube
                                videoId={trailer.key}
                                className="reproductor container trailer-flex"
                                containerClassName="youtube-container amru"
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                        autoplay: 1,
                                        controls: 0,
                                        cc_load_policy: 0,
                                        fs: 0,
                                        iv_load_policy: 0,
                                        modestbranding: 0,
                                        rel: 0,
                                        showinfo: 0,
                                    },
                                }}
                            />
                            <button onClick={() => setPlaying(false)} className='boton'>
                                Close
                            </button>
                        </>
                    ) : (
                        <div className='container'>
                            <div className=''>
                                <button
                                    className="botonPlay"
                                    onClick={() => trailer ? setPlaying(true) : alert("Sorry, no trailer available")}
                                    type="button"
                                >
                                    Play Trailer
                                </button>
                                <h1 className='text.white'>{selectedItem.title}</h1>
                                <p className='text-white'>{selectedItem.overview}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading movie details...</p>
            )}
        </div>
    );
}

export default VideoReproductor;
