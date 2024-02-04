import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { latestMoviesReducer, movieDetailsReducer, moviesReducer, searchDataReducer, topRatedMoviesReducer, trendingsReducer } from './reducers/movieReducer';
import { latestTvShowsReducer, topRatedTvShowsReducer, tvShowDetailsReducer, tvShowsReducer } from './reducers/tvShowReducer';

const reducer = combineReducers({
    trendings: trendingsReducer,
    latestMovies: latestMoviesReducer,
    latestTvShows:latestTvShowsReducer,
    movies:moviesReducer,
    tvShows:tvShowsReducer,
    topRatedMovies:topRatedMoviesReducer,
    topRatedTvShows:topRatedTvShowsReducer,
    movieDetails:movieDetailsReducer,
    tvShowDetails:tvShowDetailsReducer,
    search:searchDataReducer
});

const middleware = [thunk];

const store = createStore(reducer, (applyMiddleware(...middleware)));

export default store;

