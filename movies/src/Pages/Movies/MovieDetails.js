import './MovieDetails.css'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Divider, Modal, Typography } from '@mui/material'
import { Image, Progress } from 'antd'
import { FaPlay } from "react-icons/fa";
import { Spinner } from 'react-bootstrap'
import MovieCast from './MovieCast'
import MovieMedia from './MovieMedia'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieCredits, getMovieDetails, getMovieImages, getMovieVideos, getSimilarMovies } from '../../actions/movieAction'




const conicColors = {
    '0%': 'red',
    '50%': 'yellow',
    '100%': 'green'
};

const MovieDetails = () => {
    const dispatch = useDispatch()
    const { movie, videos, similarMovies, loading, credits } = useSelector((state) => state.movieDetails)
    const navigate = useNavigate()
    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getMovieDetails(id))
        dispatch(getMovieCredits(id))
        dispatch(getMovieVideos(id))
        dispatch(getMovieImages(id))
        dispatch(getSimilarMovies(id))
    }, [dispatch, id])

    console.log(credits);

    const movieTrailer = videos?.results?.find((video) => video.type === "Trailer" && video.official === true)
    const hours = Math.floor(movie?.runtime / 60);
    const minutes = movie?.runtime % 60;
    const Director = credits?.crew.find((data) => data.job === 'Director')
    const Writer = credits?.crew.find((data) => data.job === 'Writer')


    return <>
        {loading ? (
            <div style={{ height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Spinner animation="border" variant="light" style={{ width: '45px', height: '45px' }} />
            </div>
        ) : (
            <section style={{ padding: '4rem 0 0' }} >
                <div className="movies_details">
                    <div className='movie_details_banner'
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})` }}>
                        <div className='movie_details_container'>
                            <div className='poster_img' style={{ minWidth: '300px', width: '300px' }}>
                                {movie?.poster_path !== null ? (
                                    <Image className='w-100 h-100' style={{ borderRadius: '12px' }}
                                        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt={movie?.name} />
                                ) : (
                                    <img width={'100%'} style={{ objectFit: "cover" }} src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt='' />
                                )}
                            </div>
                            <div className='movie_details_content'>
                                <h1 className='title'>
                                    {movie?.title ? (
                                        movie?.title
                                    ) : (
                                        movie?.name
                                    )}
                                    <span> ({movie?.release_date ? (
                                        movie?.release_date?.slice(0, 4)
                                    ) : (
                                        movie?.first_air_date?.slice(0, 4)
                                    )})
                                    </span>
                                </h1>
                                <div className='d-flex mt-1 ms-1 mb-3 flex-wrap'>
                                    {movie?.genres?.map((genre, index) =>
                                        <p className='geners' key={index}>
                                            {genre.name}
                                            {index !== movie?.genres.length - 1 && <span>,&nbsp;</span>}
                                        </p>)}
                                    <span className='runtime'>{`${hours}h ${minutes}m`}</span>
                                </div>
                                <div className='d-flex mt-2 mb-3'>
                                    <Progress className='progress_circle' type="circle"
                                        percent={(Math.floor((movie?.vote_average / 10) * 100))}
                                        strokeColor={conicColors} size={52} />
                                    <Button className='ms-4'
                                        sx={{
                                            color: "white", fontWeight: 600,
                                            fontSize: "12px",
                                            borderColor: 'rgba(200, 200, 210, 0.5)',
                                            '&:hover': {
                                                borderColor: 'white',
                                            },
                                        }}
                                        onClick={handleOpen}
                                        variant='outlined'
                                    >
                                        <FaPlay /> &nbsp; Play Trailer</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <div className='trailer_player'>
                                            <iframe
                                                width="100%" height="100%"
                                                allow='autoplay'
                                                title='trailer'
                                                src={`https://www.youtube.com/embed/${movieTrailer?.key}?autoplay=1`}
                                            />
                                        </div>
                                    </Modal>
                                </div>
                                <i className='mt-2 mb-3 tagline'> <span>{movie?.tagline}</span></i>
                                <div className='overview'>
                                    <h4>Overview</h4>
                                    <p>{movie?.overview}</p>
                                </div>
                                <div className='d-flex mt-3'>
                                {Director &&
                                    <p className='mb-3 me-5 fw-bold' ><span className='d-block fw-light' >{Director?.job}</span>{Director?.name}</p>}
                                {Writer &&
                                    <p className='mb-3 me-5 fw-bold' ><span className='d-block fw-light' >{Writer?.job}</span>{Writer?.name}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='movie_cast_detail d-flex p-4' style={{ backgroundColor: 'black' }}>
                    <div className='d-flex flex-column w-75'>
                        <Typography variant='h2' sx={{ color: 'white', mb: 2, }} fontSize={20}>
                            Top Billed Cast
                        </Typography>
                        <div className='trending_container  me-3 mb-2'>
                            {credits?.cast?.map((data) => {
                                return <MovieCast key={data.cast_id} data={data} />
                            })}
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#242428", borderRadius: 10, height: 'fit-content' }} className='w-100 p-4 mt-4 '>
                        <p className='mb-3'><strong className='d-block' >Status</strong>{movie?.status}</p>
                        <p className='mb-3'><strong className='d-block' >Orginal Language</strong>{movie?.spoken_languages?.map((e) => e.english_name).toLocaleString()}</p>
                        <p className='mb-3'><strong className='d-block' >Budget</strong>$ {movie?.budget ? `${movie?.budget?.toLocaleString()}.00` : '--'}</p>
                        <p className='mb-2'><strong className='d-block' >Revenue</strong>$ {movie?.revenue ? `${movie?.revenue?.toLocaleString()}.00` : '--'}</p>
                    </div>
                </div>
                <div className='media_section p-4 pb-2'>
                    <MovieMedia />
                </div>
                <Divider sx={{ backgroundColor: 'grey' }} />
                {similarMovies?.results?.length !== 0 &&
                    <div className='ps-1 pe-1 pt-3'>
                        <Typography variant='h4' fontSize={24} fontWeight={600} sx={{ mb: 1, ml: 1 }}>
                            You may also like
                        </Typography>
                        <div className="movies_container">
                            {similarMovies?.results?.slice(0, 14).map((data) => (
                                <div key={data.id} className='movies_card' onClick={() => navigate(`/movie/${data.id}`)}>
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
                                        <p className='movies_date'>{data.release_date.slice(0, 4)}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                }
            </section>
        )}
    </>
}

export default MovieDetails
