import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getLatestMovies} from '../../actions/movieAction'

const LatestMovies = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {movies} = useSelector((state)=> state.latestMovies)


  useEffect(() => {
    dispatch(getLatestMovies())
  }, [dispatch])


  return (
    <div className='latest' >
      <Typography variant='h2' sx={{ color: 'white', fontWeight: 600, mt: 3, mb: 1, ml: 2 }} fontSize={26}>
        Latest Movies
      </Typography>
      <div className="movies_container">
        {movies?.results?.map((data) => (
          <div key={data.id} className='movies_card' onClick={() => navigate(`/movie/${data.id}`)}>
            {data.poster_path !== null ? (
              <div className='movies_img'>
                <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.name} />
              </div>
            ) : (
              <img width={'100%'} style={{ objectFit: "cover" }} src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt=''  />
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
  )
}

export default LatestMovies