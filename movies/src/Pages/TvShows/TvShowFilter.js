import React, { useEffect, useState } from 'react'
import { Button, Skeleton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Select } from 'antd'
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTvShows, getTvShowsGenres } from '../../actions/tvShowAction';
import { getLanguages } from '../../actions/movieAction';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';



const TvShowFilter = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { genres } = useSelector((state) => state.tvShows)
    const { languages } = useSelector((state) => state.movies)
    const [queryParams] = useSearchParams()
    const page = queryParams.get('page')
    const allQueryParams = Object.fromEntries(queryParams)
    const [tvShowGenres, setTvShowGenres] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [sort, setSort] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('')
    const [genresLoading,setGenresLoading] = useState(false)
    const choosedGenres = queryParams.get('genres');

    useEffect(() => {
        dispatch(getTvShows(page ?? 1, allQueryParams))
        dispatch(getTvShowsGenres(setGenresLoading))
        dispatch(getLanguages())

        if(choosedGenres){
            setTvShowGenres(choosedGenres?.split(',').map(Number))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page])


    const handleGenreChange = (e, genre) => {
        setTvShowGenres(genre);
    };

    const handleChange = (value) => {
        setSort(value)
    };



    const sortingArr = [
        {
            value: 'popularity.desc',
            label: 'Popularity Descending',
        },
        {
            value: 'popularity.asc',
            label: 'Popularity Ascending',
        },
        {
            value: 'vote_average.desc',
            label: 'Rating Dscending',
        },
        {
            value: 'vote_average.asc',
            label: 'Rating Ascending',
        },
        {
            value: 'primary_release_date.desc',
            label: 'Release Date Dscending',
        },
        {
            value: 'primary_release_date.asc',
            label: 'Release Date Ascending',
        },
    ]

    const languageOptions = languages?.map((data) => ({
        value: data.iso_639_1,
        label: data.english_name
    })) || []


    const removeEmptyFields = (obj) => {
        return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== '' && value !== undefined));
    };

    const handleFilter = () => {
        const filterData = { sort, genres: tvShowGenres.join(','), startDate, endDate, selectedLanguage }
        const filteredData = removeEmptyFields(filterData)
        navigate(`/tv-shows?${createSearchParams(filteredData)}`)
        dispatch(getTvShows(1, filterData))
    }

    return (
        <div className='filter_option w-100 mb-3'>
            <Typography className='mb-3 ms-1' variant='h4' fontSize={20}>
                Filter
            </Typography>
            <div className='d-flex gap-3 align-items-center flex-wrap' >
                <div className='filter_select_container'>
                    <Typography variant='h6' fontSize={14} fontWeight={600}>
                        Sort :
                    </Typography>
                    <Select
                        className='filter_select'
                        defaultValue="Popularity Descending"
                        suffixIcon={null}
                        style={{
                            width: 'fit-content',
                        }}
                        onChange={handleChange}
                        options={sortingArr}
                    />
                </div>
                <div className='d-flex gap-2 align-items-center filter_date_option'>
                    <div className='filter_select_container'>
                        <Typography variant='h6' fontSize={14} fontWeight={600}>
                            Start Date :
                        </Typography>
                        <DatePicker className='date_picker' onChange={(e, d) => setStartDate(d)} />
                    </div>
                    <div className='filter_select_container'>
                        <Typography variant='h6' fontSize={14} fontWeight={600}>
                            End Date :
                        </Typography>
                        <DatePicker className='date_picker' onChange={(e, d) => setEndDate(d)} />
                    </div>
                </div>
                <div className='filter_select_container'>
                    <Typography variant='h6' fontSize={14} fontWeight={600}>
                        Languages :
                    </Typography>
                    <Select
                        className='filter_select language_filter'
                        defaultValue={"All"}
                        suffixIcon={null}
                        style={{
                            width: 'fit-content',
                        }}
                        onChange={(e, v) => setSelectedLanguage(v.value)}
                        options={[{ value: '', label: 'All' }, ...languageOptions]}
                    />
                </div>
            </div>
            <div>
                <div className='mt-3'>
                    <Typography variant='h6' className='mb-2 ml-1' fontSize={18}>
                        Genres
                    </Typography>
                    {genresLoading ? (
                        <>
                            <Skeleton animation='wave' height={40} />
                            <Skeleton animation='wave' height={40} />
                        </>
                    ) : (
                    <ToggleButtonGroup className='genre_btn_group flex-wrap' sx={{ gap: '14px' }}
                        value={tvShowGenres}
                        onChange={handleGenreChange}
                        defaultValue={['all']}
                    >
                        {genres?.map((data) => {
                            return <ToggleButton
                                key={data.id}
                                value={data.id}
                                className='genres_btn'
                                sx={{
                                    '&:hover': {
                                        borderColor: 'white !important',
                                    },
                                }}
                                variant="outlined">{genresLoading ? <Skeleton animation='wave' width={50} /> : data.name}</ToggleButton>
                        })}
                    </ToggleButtonGroup>
                    )}
                </div>
            </div>
            <div className='d-flex mt-1 justify-content-end me-2 filter_btn_div'>
                <Button
                    sx={{
                        color: "white", fontWeight: 600,
                        fontSize: "14px",
                        backgroundColor: "black",
                        border: '1px solid black ',
                        borderRadius: "8px",
                        boxShadow: "none",
                        '&:hover': {
                            backgroundColor: "black",
                            borderColor: 'white',
                        },
                    }}
                    className='filter_btn'
                    onClick={handleFilter}
                    variant="contained">Filter</Button>
            </div>
        </div>
    )
}

export default TvShowFilter;