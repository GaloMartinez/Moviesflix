import { useContext } from "react";
import { TrailersContext } from "../../Context/TrailersContext";


export const useFetchMovieDetails = () => {
   
    return useContext(TrailersContext);
};

export default useFetchMovieDetails;