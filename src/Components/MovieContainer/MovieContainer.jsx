import './MovieContainer.css'

function MovieContainer({ items, selectItem, urlImage }) {
    
    return (
        <div>
            <div className='container-movie-card'>
                <div className='movie-card row'>
                {/* <h1 className=' mb-2 title-home'>Peliculas y series</h1>  hay que realizar un if para cada pagina */}
                    {items.map((item) => (
                        <div key={item.id} className='movie-card-column col-6 col-md-4' onClick={() => selectItem(item, item.media_type)}>
                            <img  className='movie-card' src={`${urlImage}${item.poster_path}`} alt="" height={600} width="100%" />
                            <h4 className='title-container-movies text-center'>{item.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieContainer
