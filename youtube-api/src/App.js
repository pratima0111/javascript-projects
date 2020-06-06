import React from 'react';
import {Grid} from '@material-ui/core';         //curly braces are used when there is no default export

import youtube from './api/youtube';

import {SearchBar, VideoDetail, VideoList} from './components';


class App extends React.Component{
    state={
    videos:[],
    selectedVideo: null,
    }
    componentDidMount(){
        this.handleSubmit('pdf generation with react and node');
    }
    onVideoSelect = (video) =>{
        this.setState({selectedVideo: video})

    }


    handleSubmit=async(searchTerm)=>{
        const response = await youtube.get('search',{params:{
            part:'snippet',
            maxResults : 5,             //maximum result videos
            key : 'AIzaSyCvdfQVulTOQqwjgN118YRMg_kn3F617Lo',
            q:searchTerm,
        }
    });
        this.setState({videos:response.data.items, selectedVideo:response.data.items[0]});

        // console.log(response.data.items);

    }
    render(){
        const {selectedVideo, videos} = this.state;
        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={11}>
                    <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <SearchBar onFormSubmit ={this.handleSubmit}/>
                    </Grid>
                    <Grid item xs={8} >
                        <VideoDetail video={selectedVideo}/>
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos = {videos} onVideoSelect={this.onVideoSelect}></VideoList>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;





