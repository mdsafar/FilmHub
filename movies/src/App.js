import './App.css';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Movies from './Pages/Movies/Movies';
import TvShows from './Pages/TvShows/TvShows';
import TopRated from './Pages/TopRated/TopRated';
import MovieDetails from './Pages/Movies/MovieDetails';
import TvShowDetails from './Pages/TvShows/TvShowDetails';
import SearchResults from './Pages/Search/SearchResults';


function App() {
  return <>
   <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
        <Route path='/tv-shows' element={<TvShows/>}/>
        <Route path='/tv/:id' element={<TvShowDetails/>}/>
        <Route path='/top-rated' element={<TopRated/>}/>
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
