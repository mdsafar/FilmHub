import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Divider, Modal, Typography } from '@mui/material'
import { Image, Progress } from 'antd'
import { FaPlay } from "react-icons/fa";
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendedTvShows, getTvShowCredits, getTvShowDetails, getTvShowImages, getTvShowVideos } from '../../actions/tvShowAction'
import Media from '../../Components/Media';
import Cast from '../../Components/Cast';



const conicColors = {
    '0%': 'red',
    '50%': 'yellow',
    '100%': 'green'
};

const TvShowDetails = () => {
    const dispatch = useDispatch()
    const { tvShow, videos, loading, credits, recommendedTvShows,images } = useSelector((state) => state.tvShowDetails)
    const navigate = useNavigate()
    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    useEffect(() => {
        dispatch(getTvShowDetails(id))
        dispatch(getTvShowCredits(id))
        dispatch(getTvShowVideos(id))
        dispatch(getTvShowImages(id))
        dispatch(getRecommendedTvShows(id))
    }, [dispatch, id])


    const tvTrailer = videos?.results?.find((video) => video.type === "Trailer" || video.official === true)
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
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvShow?.backdrop_path})` }}>
                        <div className='movie_details_container'>
                            <div className='poster_img' style={{ minWidth: '300px', width: '300px' }}>
                                {tvShow?.poster_path !== null ? (
                                    <Image className='w-100 h-100' style={{ borderRadius: '12px' }}
                                        src={`https://image.tmdb.org/t/p/original/${tvShow?.poster_path}`} alt={tvShow?.name} />
                                ) : (
                                    <img width={'100%'} style={{ objectFit: "cover" }} src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt='' />
                                )}
                            </div>
                            <div className='movie_details_content'>
                                <h1 className='title'>
                                    {tvShow?.title ? (
                                        tvShow?.title
                                    ) : (
                                        tvShow?.name
                                    )}
                                    <span> ({tvShow?.release_date ? (
                                        tvShow?.release_date?.slice(0, 4)
                                    ) : (
                                        tvShow?.first_air_date?.slice(0, 4)
                                    )})
                                    </span>
                                </h1>
                                <div className='d-flex ms-1 mb-3 flex-wrap'>
                                    {tvShow?.genres?.map((genre, index) =>
                                        <p className='geners' key={index}>
                                            {genre.name}
                                            {index !== tvShow?.genres.length - 1 && <span>,&nbsp;</span>}
                                        </p>)}
                                    <span className='runtime'>{tvShow?.number_of_seasons} Seasons</span>
                                </div>
                                <div className='d-flex mt-2 mb-3'>
                                    <Progress className='progress_circle' type="circle"
                                        percent={(Math.floor((tvShow?.vote_average / 10) * 100))}
                                        strokeColor={conicColors} size={52} />
                                    <Button className='ms-4'
                                        sx={{
                                            color: "white", fontWeight: 600,
                                            fontSize:"12px",
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
                                                title='trailer'
                                                width="100%" height="100%"
                                                allow='autoplay'
                                                src={`https://www.youtube.com/embed/${tvTrailer?.key}?autoplay=1`}
                                            />
                                        </div>
                                    </Modal>
                                </div>
                                <i className='mt-3 mb-3 tagline'> <span>{tvShow?.tagline}</span></i>
                                <div className='overview'>
                                    <h4>Overview</h4>
                                    <p>{tvShow?.overview}</p>
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
                        <Typography variant='h2' sx={{ color: 'white', mb: 2, }} fontSize={22}>
                            Top Billed Cast
                        </Typography>
                        <div className='trending_container cast_container me-3 mb-2'>
                            {credits?.cast?.map((data) => {
                                return <Cast key={data.id} data={data} />
                            })}
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#242428", borderRadius: 10, height: 'fit-content' }} className='w-100 p-4 mt-4 me-2'>
                        <p className='mb-3'><strong className='d-block' >Original Name</strong>{tvShow?.original_name}</p>
                        <p className='mb-3'><strong className='d-block' >Status</strong>{tvShow?.status}</p>
                        <p className='mb-3'><strong className='d-block' >Orginal Language</strong>{tvShow?.spoken_languages?.map((e) => e.english_name).toLocaleString()}</p>
                        <p className='mb-3'><strong className='d-block' >Type</strong>{tvShow?.type}</p>
                    </div>
                </div>
                <div className='media_section p-4 pb-2'>
                    <Media videos={videos} images={images} />
                </div>
                <Divider sx={{ backgroundColor: 'grey' }} />
                {recommendedTvShows?.results?.length !== 0 &&
                    <div className='ps-1 pe-1 pt-3'>
                        <Typography variant='h4' fontSize={24} fontWeight={600} sx={{ mb: 1, ml: 1 }}>
                            Recommendations
                        </Typography>
                        <div className="movies_container">
                            {recommendedTvShows?.results?.slice(0, 14).map((data) => (
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
                                            {data.name?.length > 16 ? `${data.name?.slice(0, 14)}...` : data.name}
                                        </h2>
                                        <p className='movies_date'>{data.first_air_date?.slice(0, 4)}</p>
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

export default TvShowDetails;