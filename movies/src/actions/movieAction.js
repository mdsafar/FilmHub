import axios from "axios";
import { GET_LANGUAGES, GET_LATEST_MOVIES, GET_MOVIES_FAIL, GET_MOVIES_GENRES, GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS, GET_MOVIE_CREDITS, GET_MOVIE_IMAGES, GET_MOVIE_VIDEOS, GET_SIMILAR_MOVIES, GET_TRENDINGS_FAIL, GET_TRENDINGS_REQUEST, GET_TRENDINGS_SUCCESS, MOVIE_DETAILS_FAIL, MOVIE_DETAILS_REQUEST, MOVIE_DETAILS_SUCCESS, SEARCH_DATA_FAIL, SEARCH_DATA_REQUEST, SEARCH_DATA_SUCCESS, TOP_RATED_MOVIES_FAIL, TOP_RATED_MOVIES_REQUEST, TOP_RATED_MOVIES_SUCCESS } from "../constants/movieConstants";

const url = 'https://api.themoviedb.org'
const config = {
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGYyY2Y1ZDMxZjAyNTAwZGQ2OWQ4ODAxNTFjZDg1NyIsInN1YiI6IjY1YThlMzVhNTVjMWY0MDEyODg5ZGM2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3U1lygPWToSZHFAwGLHiaGahMNKfh8nIp4o9a5qhiM'
    }
}

export const getTrendings = () => async (dispatch) => {
    try {
        dispatch({ type: GET_TRENDINGS_REQUEST })

        await axios.get(`${url}/3/trending/all/day?language=en-US`, config).then((response) => {
            dispatch({ type: GET_TRENDINGS_SUCCESS, payload: response.data })
        })
    } catch (err) {
        dispatch({ type: GET_TRENDINGS_FAIL, payload: err.response.data.message })
    }
}


export const getLatestMovies = () => async (dispatch) => {
    try {

        await axios.get(`${url}/3/movie/now_playing?language=en-US&page=1`, config).then((response) => {
            dispatch({ type: GET_LATEST_MOVIES, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}


export const searchData = (word, page) => async (dispatch) => {
    try {

        dispatch({ type: SEARCH_DATA_REQUEST })

        await axios.get(`${url}/3/search/multi?query=${word}&include_adult=false&language=en-US&page=${page}`, config).then((response) => {
            dispatch({ type: SEARCH_DATA_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: SEARCH_DATA_FAIL, payload: err.response.data.message })
    }
}

export const getMovies = (page, allQueryParams) => async (dispatch) => {
    try {
        const { sort, genres, startDate, endDate, selectedLanguage } = allQueryParams
        dispatch({ type: GET_MOVIES_REQUEST })

        let apiUrl = `${url}/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}`

        if (sort !== undefined) {
            apiUrl += `&sort_by=${sort}`
        }

        if (genres !== undefined) {
            apiUrl += `&with_genres=${genres}`;
        }

        if (startDate !== undefined) {
            apiUrl += `&primary_release_date.gte=${startDate}`
        }

        if (endDate !== undefined) {
            apiUrl += `&primary_release_date.lte=${endDate}`
        }

        if (selectedLanguage !== undefined) {
            apiUrl += `&with_original_language=${selectedLanguage}`
        }

        await axios.get(apiUrl, config).then((response) => {
            dispatch({ type: GET_MOVIES_SUCCESS, payload: response.data })
        })

    } catch (err) {

        dispatch({ type: GET_MOVIES_FAIL, payload: err.response.data.message })
        console.log(err)
    }
}

export const getMoviesGenres = (setLoading) => async (dispatch) => {
    try {
         setLoading(true)
        await axios.get(`${url}/3/genre/movie/list?language=en`, config).then((response) => {
            setLoading(false)
            dispatch({ type: GET_MOVIES_GENRES, payload: response.data.genres })
        })

    } catch (err) {
        console.log(err)
        setLoading(false)
    }
}


export const getLanguages = () => async (dispatch) => {
    try {

        await axios.get(`${url}/3/configuration/languages`, config).then((response) => {
            dispatch({ type: GET_LANGUAGES, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}

export const getTopRatedMovies = (page) => async (dispatch) => {
    try {
        dispatch({ type: TOP_RATED_MOVIES_REQUEST })

        await axios.get(`${url}/3/movie/top_rated?language=en-US&page=${page}`, config).then((response) => {
            dispatch({ type: TOP_RATED_MOVIES_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: TOP_RATED_MOVIES_FAIL, payload: err.response.data.message })
    }
}

export const getMovieDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: MOVIE_DETAILS_REQUEST })

        await axios.get(`${url}/3/movie/${id}?language=en-US`, config).then((response) => {
            dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: MOVIE_DETAILS_FAIL, payload: err.response.data.message })
    }
}


export const getMovieCredits = (id) => async (dispatch) => {
    try {

        await axios.get(`${url}/3/movie/${id}/credits?language=en-US`, config).then((response) => {
            dispatch({ type: GET_MOVIE_CREDITS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}


export const getMovieVideos = (id) => async (dispatch) => {
    try {

        await axios.get(`${url}/3/movie/${id}/videos?language=en-US`, config).then((response) => {
            dispatch({ type: GET_MOVIE_VIDEOS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}

export const getMovieImages = (id) => async (dispatch) => {
    try {

        await axios.get(`${url}/3/movie/${id}/images`, config).then((response) => {
            dispatch({ type: GET_MOVIE_IMAGES, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}

export const getSimilarMovies = (id) => async (dispatch) => {
    try {

        await axios.get(`${url}/3/movie/${id}/similar?language=en-US&page=1`, config).then((response) => {
            dispatch({ type: GET_SIMILAR_MOVIES, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}
