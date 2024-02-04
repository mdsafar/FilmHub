import { GET_LANGUAGES, GET_LATEST_MOVIES, GET_MOVIES_FAIL, GET_MOVIES_GENRES, GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS, GET_MOVIE_CREDITS, GET_MOVIE_IMAGES, GET_MOVIE_VIDEOS, GET_SIMILAR_MOVIES, GET_TRENDINGS_FAIL, GET_TRENDINGS_REQUEST, GET_TRENDINGS_SUCCESS, MOVIE_DETAILS_FAIL, MOVIE_DETAILS_REQUEST, MOVIE_DETAILS_SUCCESS, SEARCH_DATA_FAIL, SEARCH_DATA_REQUEST, SEARCH_DATA_SUCCESS, TOP_RATED_MOVIES_FAIL, TOP_RATED_MOVIES_REQUEST, TOP_RATED_MOVIES_SUCCESS } from "../constants/movieConstants";

export const trendingsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TRENDINGS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_TRENDINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        case GET_TRENDINGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const latestMoviesReducer = (state = {}, action) => {
    switch (action.type) {

        case GET_LATEST_MOVIES:
            return {
                ...state,
                movies: action.payload
            }

        default:
            return state;
    }
}

export const moviesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload
            }
        case GET_MOVIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_MOVIES_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_LANGUAGES:
            return {
                ...state,
                languages: action.payload
            }
        default:
            return state
    }
}

export const topRatedMoviesReducer = (state = {}, action) => {
    switch (action.type) {
        case TOP_RATED_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TOP_RATED_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload
            }

        case TOP_RATED_MOVIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const movieDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case MOVIE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MOVIE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                movie: action.payload
            }
        case MOVIE_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_MOVIE_CREDITS:
            return {
                ...state,
                credits: action.payload
            }
        case GET_MOVIE_VIDEOS:
            return {
                ...state,
                videos: action.payload
            }
        case GET_MOVIE_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        case GET_SIMILAR_MOVIES:
            return {
                ...state,
                similarMovies: action.payload
            }

        default:
            return state;
    }

}

export const searchDataReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SEARCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case SEARCH_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}