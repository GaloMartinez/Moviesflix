import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import useConfig from '../Components/Hooks/useConfig';

export const TrailersContext = createContext();

export function TrailersProvider({ children }) {
    const { API_URL, API_KEY } = useConfig();
    const [contentItems, setContentItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [series, setSeries] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState(null);

    const fetchDetails = async (id, type) => {
        if (!id || !type) {
            console.error("ID o tipo de contenido no proporcionado.");
            return;
        }
        try {
            const response = await axios.get(`${API_URL}/${type}/${id}`, {
                params: { api_key: API_KEY, append_to_response: 'videos' }
            });
            const data = response.data;
            const trailerFound = data.videos.results[0] || null;
            setTrailer(trailerFound);
            setSelectedItem(data);
        } catch (error) {
            console.error(`Error fetching ${type} details:`, error);
            setTrailer(null);
        }
    };

    const selectItem = async (item, type) => {
        if (!item || !item.id) {
            console.error("El item seleccionado no es válido:", item);
            setTrailer(null);
            return;
        }

        if (type === 'movie') {
            setSelectedMovie(item);
            setSelectedItem(item);
            await fetchDetails(item.id, 'movie');
        } else if (type === 'tv') {
            setSelectedSeries(item);
            setSelectedItem(item);
            await fetchDetails(item.id, 'tv');
        } else {
            if (item.media_type === 'movie') {
                setSelectedMovie(item);
                setSelectedItem(item);
                await fetchDetails(item.id, 'movie');
            } else if (item.media_type === 'tv') {
                setSelectedSeries(item);
                setSelectedItem(item);
                await fetchDetails(item.id, 'tv');
            } else {
                console.error("El item seleccionado no es válido:", item);
                setTrailer(null);
            }
        }
        setPlaying(false);
        window.scrollTo(0, 0);
    };

    const resetIndex = () => {
        if (contentItems.length > 0) {
            const firstValidItem = contentItems.find(item => item.media_type === 'movie' || item.media_type === 'tv');
            if (firstValidItem) {
                selectItem(firstValidItem, firstValidItem.media_type);
            }
        }
        if (movies.length > 0) {
            selectItem(movies[0], 'movie');
        }
        if (series.length > 0) {
            selectItem(series[0], 'tv');
        }
    };

    const searchContent = async (query, type) => {
        const params = { api_key: API_KEY, query };
        try {
            let response;
            if (type === 'movie') {
                response = await axios.get(`${API_URL}/search/movie`, { params });
                const movies = response.data.results.map(movie => ({ ...movie, media_type: 'movie' }));
                setMovies(movies);
                if (movies.length > 0) {
                    selectItem(movies[0], 'movie');
                }
            } else if (type === 'tv') {
                response = await axios.get(`${API_URL}/search/tv`, { params });
                const series = response.data.results.map(tv => ({ ...tv, media_type: 'tv' }));
                setSeries(series);
                if (series.length > 0) {
                    selectItem(series[0], 'tv');
                }
            } else {
                const responses = await Promise.all([
                    axios.get(`${API_URL}/search/movie`, { params }),
                    axios.get(`${API_URL}/search/tv`, { params })
                ]);
                const movies = responses[0].data.results.map(movie => ({ ...movie, media_type: 'movie' }));
                const series = responses[1].data.results.map(tv => ({ ...tv, media_type: 'tv' }));
                const combinedResults = [...movies, ...series];
                setContentItems(combinedResults);
                if (combinedResults.length > 0) {
                    const firstValidItem = combinedResults.find(item => item.media_type === 'movie' || item.media_type === 'tv');
                    if (firstValidItem) {
                        selectItem(firstValidItem, firstValidItem.media_type);
                    }
                }
            }
        } catch (error) {
            console.error('Error searching content:', error);
        }
    };

    useEffect(() => {
        const fetchContent = async () => {
            const params = { api_key: API_KEY, sort_by: 'popularity.desc' };
            try {
                const responses = await Promise.all([
                    axios.get(`${API_URL}/discover/movie`, { params }),
                    axios.get(`${API_URL}/discover/tv`, { params })
                ]);
                const movies = responses[0].data.results.map(movie => ({ ...movie, media_type: 'movie' }));
                const series = responses[1].data.results.map(tv => ({ ...tv, media_type: 'tv' }));
                setMovies(movies);
                setSeries(series);
                const combinedResults = [...movies, ...series];

                setContentItems(combinedResults);

                // Seleccionar el primer ítem válido para "home"
                if (movies.length > 0) {
                    selectItem(movies[0], 'movie');
                } else if (series.length > 0) {
                    selectItem(series[0], 'tv');
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, [API_URL, API_KEY]);

    useEffect(() => {
        // Seleccionar el primer ítem válido para "series"
        if (series.length > 0) {
            selectItem(series[0], 'tv');
        }
    }, [series]);

    useEffect(() => {
        // Seleccionar el primer ítem válido para "movies"
        if (movies.length > 0) {
            selectItem(movies[0], 'movie');
        }
    }, [movies]);

    return (
        <TrailersContext.Provider value={{
            contentItems, selectedItem, trailer, playing, setPlaying, selectItem,
            movies, selectedMovie, series, selectedSeries,
            searchContent, resetIndex
        }}>
            {children}
        </TrailersContext.Provider>
    );
}
