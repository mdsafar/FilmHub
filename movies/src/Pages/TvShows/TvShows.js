import React from 'react'
import { Divider, Pagination } from '@mui/material'
import { Spinner } from 'react-bootstrap'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import TvShowFilter from './TvShowFilter'
import { useSelector } from 'react-redux'


const TvShows = () => {
    const navigate = useNavigate()
    const { tvShows, loading } = useSelector((state) => state.tvShows)
    const [queryParams] = useSearchParams()
    const allQueryParams = Object.fromEntries(queryParams)


    function changePage(e, value) {
        navigate(`/tv-shows?${createSearchParams({ ...allQueryParams, page: value })}`)
    }


    return <>
        <section className='movies_section'>
            <TvShowFilter />
            <Divider sx={{ backgroundColor: "grey" }} />
            {loading ? (
                <div style={{ height: "35vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Spinner animation="border" variant="light" style={{ width: '45px', height: '45px' }} />
                </div>
            ) : (
                <>
                    <div className="movies_container">
                        {tvShows?.results?.map((data) => (
                            <div key={data.id} className='movies_card' onClick={() => navigate(`/tv/${data.id}`)}>
                                {data.poster_path !== null ? (
                                    <div className='movies_img'>
                                        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.name} />
                                    </div>
                                ) : (
                                    <img width={'100%'} style={{ objectFit: "cover" }} src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt='' />
                                )}
                                <div className='movies_detail'>
                                    <h2 className='movies_text'>
                                        {data.original_name?.length > 14 ? `${data.original_name?.slice(0, 14)}...` : data.original_name}
                                    </h2>
                                    <p className='movies_date'>{data.first_air_date?.slice(0, 4)}</p>
                                </div>

                            </div>
                        ))}
                    </div>

                    {tvShows?.total_pages > 1 &&
                        <div className='d-flex justify-content-center pb-3 pt-2' >
                            <Pagination
                                className='pagination'
                                defaultValue={1}
                                page={tvShows?.page}
                                onChange={changePage}
                                size={'medium'}
                                count={tvShows?.total_pages}
                                variant="outlined"
                                shape="rounded"
                            />
                        </div>
                    }
                </>
            )}
        </section>
    </>
}

export default TvShows