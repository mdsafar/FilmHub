import { Divider, Pagination, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import './TopRated.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getTopRatedMovies } from '../../actions/movieAction';
import { getTopRatedTvShows } from '../../actions/tvShowAction';

const TopRated = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { movies, loading } = useSelector((state) => state.topRatedMovies)
    const { tvShows, loading: tvShowLoading } = useSelector((state) => state.topRatedTvShows)
    const [alignment, setAlignment] = useState('movies');
    const [moviecurrentPage, setMovieCurrentPage] = useState(1)
    const [tvShowCurrentPage, setTvShowCurrentPage] = useState(1)



    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };



    useEffect(() => {
        if (alignment === 'movies') {
            dispatch(getTopRatedMovies(moviecurrentPage))
        } else {
            dispatch(getTopRatedTvShows(tvShowCurrentPage))
        }

    }, [dispatch, alignment, moviecurrentPage, tvShowCurrentPage])





    return <>
        <section>
            <div className='d-flex justify-content-between align-items-center  mb-3 pe-2'>
                <Typography variant='h2' sx={{ ml: 2, fontWeight: 500 }} fontSize={25}>
                    Top-Rated
                </Typography>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton
                        className='toggle_btn'
                        sx={{
                            backgroundColor: alignment === "movies" ? "darkslategrey !important" : "transparent",
                        }}
                        value="movies">Movies</ToggleButton>
                    <ToggleButton
                        className='toggle_btn'
                        sx={{
                            backgroundColor: alignment === "tvShows" ? "darkslategrey !important" : "transparent",
                            ml: '0 !important',
                        }} value="tvShows">TvShows</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Divider sx={{ backgroundColor: "grey" }} />
            {( loading || tvShowLoading) ? (
                <div style={{ height: "30vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Spinner animation="border" variant="light" style={{ width: '45px', height: '45px' }} />
                </div>
            ) : (
                <>
                    <div className="movies_container">
                        {alignment === 'movies' ? (
                            movies?.results?.map((data) => (
                                <div key={data.id} className='movies_card' onClick={() => navigate(`/movie/${data.id}`)}>
                                    <div className='movies_img'>
                                        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.name} />
                                    </div>
                                    <div className='movies_detail'>
                                        <h2 className='movies_text'>
                                            {data.original_title?.length > 14 ? `${data.original_title?.slice(0, 14)}...` : data.original_title}
                                        </h2>
                                        <p className='movies_date'>{data.release_date?.slice(0, 4)}</p>
                                    </div>

                                </div>
                            ))
                        ) : (
                            tvShows?.results?.map((data) => (
                                <div key={data.id} className='movies_card' onClick={() => navigate(`/tv/${data.id}`)}>
                                    <div className='movies_img'>
                                        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.name} />
                                    </div>
                                    <div className='movies_detail'>
                                        <h2 className='movies_text'>
                                            {data.name?.length > 14 ? `${data.name?.slice(0, 14)}...` : data.name}
                                        </h2>
                                        <p className='movies_date'>{data.first_air_date?.slice(0, 4)}</p>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>

                    <div className='d-flex justify-content-center pb-3 pt-2' >
                        <Pagination
                            className='pagination'
                            defaultValue={1}
                            page={alignment === 'movies' ? moviecurrentPage : tvShowCurrentPage}
                            onChange={alignment === 'movies' ? (e, value) => setMovieCurrentPage(value) :
                                (e, value) => setTvShowCurrentPage(value)}
                            size={'medium'}
                            count={120}
                            variant="outlined"
                            shape="rounded" />
                    </div>
                </>
            )}
        </section>
    </>
}

export default TopRated