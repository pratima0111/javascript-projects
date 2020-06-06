import React from 'react';
import {Grid} from '@material-ui/core';
import VideoItem from './VideoItem';

const VideoList=({videos, onVideoSelect})=>{
    const ListOfVideos = videos.map((video, id )=> <VideoItem onVideoSelect={onVideoSelect} key={id} video={video}/>)
    return (
        <Grid container spacing={10}>
       
            {ListOfVideos};

        </Grid>


    )
};

export default VideoList;
