
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TrailersProvider } from './Context/TrailersContext';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Series from './Components/Series/Series';

function App() {
  return (
    <Router>
      <TrailersProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series/>} />
        </Routes>
      </TrailersProvider>
    </Router>
  );
}

export default App;
