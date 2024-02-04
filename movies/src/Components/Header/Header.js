import React, { useEffect, useRef, useState } from 'react';
import './Header.css'
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '../Menu/Menu';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderSearchResult from './HeaderSearchResult';
import { useDispatch, useSelector } from 'react-redux'
import { searchData } from '../../actions/movieAction';
import { Spin } from 'antd'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Header() {
    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => state.search)
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const searchRef = useRef(null);
    const [keyword, setKeyword] = useState('')
    const [openResult, setOpenResult] = useState(false)



    function handleSearch(e) {
        if (e.target.value.trim() !== '') {
            dispatch(searchData(e.target.value,1))
            setKeyword(e.target.value);
            setOpenResult(true)
        } else {
            setOpenResult(false)
            setKeyword('')
        }
    }

    function handleKeyEnter(e) {
        if (e.key === 'Enter') {
            navigate(`/search?keyword=${e.target.value}`);
            setKeyword('')
            setOpenResult(false)
        }
    }

    const toggleDrawer = () => {
        setShow(!show);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setOpenResult(false)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="fixed"
                    sx={{
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                    }} >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setShow(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon style={{ fontSize: '28px' }} />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            fontSize={'25px'}
                            fontWeight={600}
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            FILMHUB
                        </Typography>
                        <Search className='d-flex align-items-center'>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                ref={searchRef}
                                placeholder="Search…"
                                onChange={handleSearch}
                                inputProps={{ 'aria-label': 'search' }}
                                onKeyDown={handleKeyEnter}
                                value={keyword}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
            <Menu toggleDrawer={toggleDrawer} show={show} />
            {openResult && (
                <div className='position-fixed search_result_container'>
                    {data?.results?.length !== 0 ? (
                        loading ? (
                            <div className='example'>
                                <Spin  />
                            </div>
                        ) : (
                            <>
                            {data?.results?.slice(0, 5)?.map((resultData) => (
                                    <HeaderSearchResult key={resultData.id} data={resultData} setKeyword={setKeyword} />
                             ))}
                                <Button
                                    sx={{
                                        color: 'white',
                                        fontWeight: 600,
                                        width: '100%',
                                        p: '10px 0',
                                        borderColor: 'rgba(200, 200, 210, 0.5)',
                                        '&:hover': {
                                            borderColor: 'white',
                                        },
                                    }}
                                    variant='outlined'
                                    onClick={() => {
                                        navigate(`/search?keyword=${keyword}`);
                                        setKeyword('');
                                    }}
                                >
                                    See All Results
                                </Button>
                            </>
                        )
                    ) : (
                        <Typography className='p-4'>
                            No Search Results!
                        </Typography>
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
