import React, { useState } from 'react'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Typography } from '@mui/material'
import { Image } from 'antd'




const Media = ({videos,images}) => {
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return <>
        <Typography variant='h4' fontSize={30} fontWeight={600} sx={{ ml: 1 }}>
            Media
        </Typography>
        <Box sx={{ width: '100%', typography: 'body1', }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab className='media_tabs' label={`Videos (${videos?.results?.length})`} value="1" />
                        <Tab className='media_tabs' label={`BackDrops (${images?.backdrops?.length})`} value="2" />
                        <Tab className='media_tabs' label={`Posters (${images?.posters?.length})`} value="3" />
                    </TabList>
                </Box>
                <TabPanel sx={{ padding: '24px 0' }} value="1">
                    <div className='d-flex media_videos' style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
                        {videos?.results?.map((data, index) => {
                            return <div key={index} style={{ minWidth: 600, width: 600, height: 400, marginRight: '20px' }}>
                                <iframe
                                    title={data.name}
                                    width="100%" height="100%"
                                    src={`https://www.youtube.com/embed/${data?.key}`}
                                />
                            </div>
                        })}
                    </div>
                </TabPanel>
                <TabPanel sx={{ padding: '24px 0' }} value="2">
                    <div className='d-flex media_back_drops' style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
                        {images?.backdrops?.map((data, index) => {
                            return <div key={index} style={{ minWidth: 600, width: 600, marginRight: '20px' }}>
                                <Image className='w-100 h-100'
                                    src={`https://image.tmdb.org/t/p/original/${data.file_path}`} alt={''} />
                            </div>

                        })}
                    </div>
                </TabPanel>
                <TabPanel sx={{ padding: '24px 0' }} value="3">
                    <div className='d-flex media_posters' style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
                        {images?.posters?.map((data, index) => {
                            return <div key={index} style={{ minWidth: 250, width: 250, marginRight: '20px' }}>
                                <Image className='w-100 h-100'
                                    src={`https://image.tmdb.org/t/p/original/${data.file_path}`} alt={''} />
                            </div>

                        })}
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    </>
}

export default Media