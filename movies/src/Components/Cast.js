import React from 'react'

const Cast = ({data}) => {
    return (
        <div key={data.id} className='trending_card'>
            <div style={{ minWidth: 160, width: 160 }}>
                {data.profile_path !== null ? (
                    <img width={'100%'} src={`https://image.tmdb.org/t/p/original/${data.profile_path}`} alt={data.name} />
                ) : (
                    <img width={'100%'} style={{ objectFit: "contain" }} src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt='' />
                )}
            </div>
            <div className='mt-2 d-flex flex-column'>
                <h2 className='trending_text fw-bold' >
                    {data.name}
                </h2>
                <h3 style={{ fontSize: 14, opacity: '0.7' }}>
                    {data.character}
                </h3>
            </div>
        </div>
    )
}

export default Cast