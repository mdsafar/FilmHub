import { GET_LATEST_TVSHOWS, GET_TVSHOWS_FAIL, GET_TVSHOWS_GENRES, GET_TVSHOWS_REQUEST, GET_TVSHOWS_SUCCESS, GET_TVSHOW_CREDITS, GET_TVSHOW_IMAGES, GET_TVSHOW_RECOMMENDATIONS, GET_TVSHOW_VIDEOS, TOP_RATED_TVSHOWS_FAIL, TOP_RATED_TVSHOWS_REQUEST, TOP_RATED_TVSHOWS_SUCCESS, TVSHOW_DETAILS_FAIL, TVSHOW_DETAILS_REQUEST, TVSHOW_DETAILS_SUCCESS } from "../constants/tvShowConstants";



export const latestTvShowsReducer = (state = {}, action) => {
    switch (action.type) {
        
        case GET_LATEST_TVSHOWS:
            return {
                ...state,
                tvShows: action.payload
            }

        default:
            return state;
    }
}

export const tvShowsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TVSHOWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_TVSHOWS_SUCCESS:
            return {
                ...state,
                loading: false,
                tvShows: action.payload
            }
        case GET_TVSHOWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_TVSHOWS_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        default:
            return state
    }
}

export const topRatedTvShowsReducer = (state = {}, action) => {
    switch (action.type) {
        case TOP_RATED_TVSHOWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TOP_RATED_TVSHOWS_SUCCESS:
            return {
                ...state,
                loading: false,
                tvShows: action.payload
            }

        case TOP_RATED_TVSHOWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const tvShowDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case TVSHOW_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TVSHOW_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                tvShow: action.payload
            }
        case TVSHOW_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_TVSHOW_CREDITS:
            return {
                ...state,
                credits: action.payload
            }
        case GET_TVSHOW_VIDEOS:
            return {
                ...state,
                videos: action.payload
            }
        case GET_TVSHOW_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        case GET_TVSHOW_RECOMMENDATIONS:
            return {
                ...state,
                recommendedTvShows: action.payload
            }

        default:
            return state;
    }

}