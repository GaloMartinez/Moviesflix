import { useContext } from "react";
import { TrailersContext } from "../Context/TrailersContext";


export const useContentFetch = () => {
    return useContext(TrailersContext);
};
export default useContentFetch;
