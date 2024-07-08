import { useState, useEffect } from 'react';
import axios from 'axios';
import useConfig from './useConfig';

export const useSeries = () => {
    return useContext(TrailersContext);
};

export default useSeries;