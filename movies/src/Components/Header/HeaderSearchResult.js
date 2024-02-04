import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderSearchResult = ({ data, setKeyword }) => {

  const navigate = useNavigate()

  function handleNavigate(type, id) {
    if (type === 'movie') {
      navigate(`/movie/${id}`)
    } else {
      navigate(`tv/${id}`)
    }
    setKeyword('')
  }


  return (
    <div key={data.id} className='d-flex p-2' onClick={() => handleNavigate(data.media_type, data.id)}>
      <div style={{ minWidth: 50, width: 30 }}>
        {data.poster_path !== null ? (
          <img width={'100%'} src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt={data.name} />
        ) : (
          <img width={'100%'} style={{ objectFit: 'cover' }} src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt='' />
        )}
      </div>
      <div className='ms-2'>
        <h2 className='movies_text'>
          {data.title ? (
            data.title?.length > 25 ? `${data.title?.slice(0, 25)}...` : data.title
          ) : (
            data.name?.length > 25 ? `${data.name?.slice(0, 25)}...` : data.name
          )}
        </h2>

        <i><p className='m-0' style={{ fontSize: '13px' }} >{data.original_name?.length > 25 ? `${data.original_name?.slice(0, 25)}...` : data.original_name}</p></i>

        <div className='d-flex mt-1  mb-2' style={{ fontSize: '13px', opacity: '0.7' }}>
          <span> {data?.media_type ? (
            data.media_type.toUpperCase()
          ) : (
            data.media_type
          )}
          </span>
          <span className='runtime'> {data?.release_date ? (
            data.release_date?.slice(0, 4)
          ) : (
            data.first_air_date?.slice(0, 4)
          )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default HeaderSearchResult