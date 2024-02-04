import React, { useEffect, useState } from 'react'
import { Button, Divider, Typography } from '@mui/material'
import { Spinner } from 'react-bootstrap'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import LatestMovies from './LatestMovies'
import LatestTvShows from './LatestTvShows'
import { useDispatch, useSelector } from 'react-redux'
import {  getTrendings } from '../../actions/movieAction'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.trendings)
  const [banner, setBanner] = useState('')




  useEffect(() => {
    dispatch(getTrendings())
  }, [dispatch])


  useEffect(() => {
    setBanner(data?.results[0])
    const timeOut = setInterval(() => {
      if (data.results && data.results.length !== 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setBanner(data.results[randomIndex]);
      }
    }, 5000)

    return (() => clearTimeout(timeOut))
  }, [data?.results]);



  function handleNavigate(type, id) {
    if (type === 'movie') {
      navigate(`/movie/${id}`)
    } else {
      navigate(`/tv/${id}`)
    }

  }


  return <>
    {loading ? (
      <div style={{ height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <Spinner animation="border" variant="light" style={{ width: '45px', height: '45px' }} />
      </div>
    ) : (
      <>
        <div style={{ paddingTop: "4rem" }}>
          <div className='trending_banner' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${banner?.backdrop_path})` }}>
            <div className='movie_trending_banner'>
              <div className='movie_details_content ps-0'>
                <h1 className='title'>
                  {banner?.title ? (
                    banner.title
                  ) : (
                    banner?.name
                  )}
                </h1>
                <div className='trending_media_type d-flex mt-1 ms-1 mb-2 fs-5'>
                  <span > {banner?.media_type ? (
                    banner?.media_type.toUpperCase()
                  ) : (
                    banner?.media_type
                  )}
                  </span>
                  <span className='runtime'> {banner?.release_date ? (
                    banner?.release_date?.slice(0, 4)
                  ) : (
                    banner?.first_air_date?.slice(0, 4)
                  )}
                  </span>
                </div>
                <div className='trending_overview'>
                  <i><p >{banner?.overview}</p></i>
                </div>
                <Button sx={{
                  width: 100,
                  color: 'white',
                  fontWeight: 600,
                  borderColor: 'rgba(200, 200, 210, 0.5)',
                  '&:hover': {
                    borderColor: 'white',
                  }
                }}
                  className='trending_details_btn'
                  onClick={() => handleNavigate(banner?.media_type,banner?.id)}
                  variant="outlined" >Details</Button>
              </div>
            </div>
          </div>
          <div className='trending'>
            <Typography variant='h2' sx={{ color: 'white', fontWeight: 600, mb: 2, }} fontSize={26}>
              Trending
            </Typography>
            <div className='trending_container'>
              {data?.results?.map((data) => {
                return <div key={data.id} className='trending_card' onClick={() => handleNavigate(data.media_type, data.id)}>
                  <div className='trending_img'>
                    <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.name} />
                  </div>
                  <div className='movies_detail'>
                    <h2 className='trending_text'>
                      {data.title ? (
                        data.title?.length > 21 ? `${data.title?.slice(0, 21)}...` : data.title
                      ) : (
                        data.name?.length > 21 ? `${data.name?.slice(0, 21)}...` : data.name
                      )}
                    </h2>
                    <p className='movies_date'>{
                      data.release_date ? (
                        data.release_date?.slice(0, 4)
                      ) : (
                        data.first_air_date?.slice(0, 4)
                      )}</p>
                  </div>
                </div>
              })}
            </div>
          </div>
          <LatestMovies />
          <Divider sx={{backgroundColor:'grey'}}/>
          <LatestTvShows />
        </div>
      </>
    )}
  </>
}

export default Home;