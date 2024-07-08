import { useContext } from "react";
import { TrailersContext } from "../../Context/TrailersContext";

const useTrailers = () => {
    return useContext(TrailersContext);
}

export default useTrailers;