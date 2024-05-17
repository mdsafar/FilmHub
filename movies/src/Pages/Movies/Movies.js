import React from 'react'
import { Divider, Pagination } from '@mui/material'
import { Spinner } from 'react-bootstrap'
import './Movies.css'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import MovieFilter from './MovieFilter'
import { useSelector } from 'react-redux'


const Movies = () => {
    const navigate = useNavigate()
    const { movies, loading } = useSelector((state) => state.movies)
    const [queryParams] = useSearchParams()
    const allQueryParams = Object.fromEntries(queryParams)


    function changePage(e, value) {
        navigate(`/movies?${createSearchParams({ ...allQueryParams, page: value })}`)
    }


    return <>
        <section className='movies_section'>
            <MovieFilter />
            <Divider sx={{ backgroundColor: "grey" }} />
            {loading ? (
                <div style={{ height: "35vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Spinner animation="border" variant="light" style={{ width: '45px', height: '45px' }} />
                </div>
            ) : (
                <>
                    <div className="movies_container">
                        {movies?.results?.map((data) => (
                            <div key={data.id} className='movies_card' onClick={() => navigate(`/movie/${data.id}`)} >
                                {data.poster_path !== null ? (
                                    <div className='movies_img'>
                                        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.name} />
                                    </div>
                                ) : (
                                    <img width={'100%'} style={{ objectFit: "cover" }} src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt='' />
                                )}
                                <div className='movies_detail'>
                                    <h2 className='movies_text'>
                                        {data.title?.length > 16 ? `${data.title?.slice(0, 14)}...` : data.title}
                                    </h2>
                                    <p className='movies_date'>{data.release_date?.slice(0, 4)}</p>
                                </div>

                            </div>
                        ))}
                    </div>

                    {movies?.total_pages > 1 &&
                        <div className='d-flex justify-content-center pb-3 pt-2' >
                            <Pagination
                                className='pagination'
                                defaultValue={1}
                                page={movies?.page}
                                onChange={changePage}
                                size={'medium'}
                                count={movies?.total_pages}
                                variant="outlined"
                                shape="rounded" />
                        </div>
                    }
                </>
            )}
        </section>
    </>
}

export default Movies