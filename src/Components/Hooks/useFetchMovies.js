import { useContext } from "react";
import { TrailersContext } from "../../Context/TrailersContext";

export const useFetchMovies = () => {
    return useContext(TrailersContext);
}

export default useFetchMovies;