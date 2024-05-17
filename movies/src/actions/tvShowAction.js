import axios from "axios";
import { GET_LATEST_TVSHOWS, GET_TVSHOWS_FAIL, GET_TVSHOWS_GENRES, GET_TVSHOWS_REQUEST, GET_TVSHOWS_SUCCESS, GET_TVSHOW_CREDITS, GET_TVSHOW_IMAGES, GET_TVSHOW_RECOMMENDATIONS, GET_TVSHOW_VIDEOS, TOP_RATED_TVSHOWS_FAIL, TOP_RATED_TVSHOWS_REQUEST, TOP_RATED_TVSHOWS_SUCCESS, TVSHOW_DETAILS_FAIL, TVSHOW_DETAILS_REQUEST, TVSHOW_DETAILS_SUCCESS } from "../constants/tvShowConstants";


const url = 'https://api.themoviedb.org'
const config = {
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGYyY2Y1ZDMxZjAyNTAwZGQ2OWQ4ODAxNTFjZDg1NyIsInN1YiI6IjY1YThlMzVhNTVjMWY0MDEyODg5ZGM2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3U1lygPWToSZHFAwGLHiaGahMNKfh8nIp4o9a5qhiM'
    }
}

export const getLatestTvShows = () => async (dispatch) => {
    try {

        await axios.get(`${url}/3/tv/on_the_air?language=en-US&page=1`, config).then((response) => {
            dispatch({ type: GET_LATEST_TVSHOWS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}

export const getTvShows = (page, allQueryParams) => async (dispatch) => {
    try {
        const { sort, genres, startDate, endDate, selectedLanguage } = allQueryParams
        dispatch({ type: GET_TVSHOWS_REQUEST })

        let apiUrl = `${url}/3/discover/tv?include_adult=false&language=en-US&page=${page}`

        if (sort !== undefined) {
            apiUrl += `&sort_by=${sort}`
        }

        if (genres !== undefined) {
            apiUrl += `&with_genres=${genres}`;
        }

        if (startDate !== undefined) {
            apiUrl += `&first_air_date.gte=${startDate}`
        }

        if (endDate !== undefined) {
            apiUrl += `&first_air_date.lte=${endDate}`
        }

        if (selectedLanguage !== undefined) {
            apiUrl += `&with_original_language=${selectedLanguage}`
        }

        await axios.get(apiUrl, config).then((response) => {
            dispatch({ type: GET_TVSHOWS_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: GET_TVSHOWS_FAIL, payload: err.response.data.message })
        console.log(err)
    }
}

export const getTvShowsGenres = (setLoading) => async (dispatch) => {
    try {
         setLoading(true)
        await axios.get(`${url}/3/genre/tv/list?language=en`, config).then((response) => {
            setLoading(false)
            dispatch({ type: GET_TVSHOWS_GENRES, payload: response.data.genres })
        })

    } catch (err) {
        setLoading(false)
        console.log(err)
    }
}

export const getTopRatedTvShows = (page) => async (dispatch) => {
    try {
        dispatch({ type: TOP_RATED_TVSHOWS_REQUEST })

        await axios.get(`${url}/3/tv/top_rated?language=en-US&page=${page}`, config).then((response) => {
            dispatch({ type: TOP_RATED_TVSHOWS_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: TOP_RATED_TVSHOWS_FAIL, payload: err.response.data.message })
    }
}

export const getTvShowDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TVSHOW_DETAILS_REQUEST })

        await axios.get(`${url}/3/tv/${id}?language=en-US`, config).then((response) => {
            dispatch({ type: TVSHOW_DETAILS_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: TVSHOW_DETAILS_FAIL, payload: err.response.data.message })
    }
}


export const getTvShowCredits = (id) => async (dispatch) => {
    try {

        await axios.get(`${url}/3/tv/${id}/credits?language=en-US`, config).then((response) => {
            dispatch({ type: GET_TVSHOW_CREDITS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}


export const getTvShowVideos = (id) => async (dispatch) => {
    try {

        await axios.get(`${url}/3/tv/${id}/videos?language=en-US`, config).then((response) => {
            dispatch({ type: GET_TVSHOW_VIDEOS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}

export const getTvShowImages = (id) => async (dispatch) => {
    try {

        await axios.get(`${url}/3/tv/${id}/images`, config).then((response) => {
            dispatch({ type: GET_TVSHOW_IMAGES, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}

export const getRecommendedTvShows = (id) => async (dispatch) => {
    try {

        await axios.get(`${url}/3/tv/${id}/recommendations?language=en-US&page=1`, config).then((response) => {
            dispatch({ type: GET_TVSHOW_RECOMMENDATIONS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
    }
}