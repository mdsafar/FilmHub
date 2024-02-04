import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Divider, Pagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { searchData } from '../../actions/movieAction'
import { Spinner } from 'react-bootstrap'

const SearchResults = () => {
    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => state.search)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        if (!keyword) {
            return;
        } else {
            dispatch(searchData(keyword, currentPage))
        }
    }, [dispatch, keyword, currentPage])


    function handleNavigate(type, id) {
        if (type === 'movie') {
            navigate(`/movie/${id}`)
        } else {
            navigate(`/tv/${id}`)
        }

    }

    function changePage(e, value) {
        setCurrentPage(value)
    }


    return <>
        {loading ? (
            <div style={{ height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Spinner animation="border" variant="light" style={{ width: '45px', height: '45px' }} />
            </div>
        ) : (
            <section>
                <Typography variant='h2' fontSize={22} fontWeight={600} className='pb-2'>
                    {`Search results for "${keyword}"`}
                </Typography>
                <Divider sx={{ backgroundColor: 'grey' }} />
                <div class="movies_container">
                    {data?.results?.length !== 0 ? (
                        data?.results?.map((data) => (
                            <div key={data.id} className='movies_card' onClick={() => handleNavigate(data.media_type, data.id)} >
                                {data.poster_path !== null ? (
                                    <div className='movies_img'>
                                        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.name} />
                                    </div>
                                ) : (
                                    <img width={'100%'} style={{ objectFit: "cover" }} src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt='' />
                                )}
                                <div className='movies_detail'>
                                    <h2 className='movies_text'>
                                        {data.title ? (
                                            data.title?.length > 21 ? `${data.title?.slice(0, 21)}...` : data.title
                                        ) : (
                                            data.name?.length > 21 ? `${data.name?.slice(0, 21)}...` : data.name
                                        )}
                                    </h2>
                                    <p className='movies_date'>
                                        {
                                            data.release_date ? (
                                                data.release_date?.slice(0, 4)
                                            ) : (
                                                data.first_air_date?.slice(0, 4)
                                            )}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography variant='h1' fontSize={32} className='p-4'>
                            No Results!
                        </Typography>
                    )
                    }
                </div>
                {data?.total_pages > 1 &&
                    <div className='d-flex justify-content-center  pb-3 pt-2' >
                        <Pagination
                            className='pagination'
                            defaultValue={1}
                            page={data?.page}
                            onChange={changePage}
                            size={'medium'}
                            count={data?.total_pages}
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                }
            </section>
        )}
    </>
}

export default SearchResults