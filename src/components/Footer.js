import React,{useEffect, useState} from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import LoopIcon from '@mui/icons-material/Loop';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ReorderIcon from '@mui/icons-material/Reorder';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './footer.css'
import { useDataLayerValue } from '../DataLayer';

function Footer() {

  const[{token}] =useDataLayerValue();
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");
  const [recent, setRecent] = useState("");
useEffect(()=>{
  fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((resp) => {
      return resp.json();
    }).then(data=>setCurrentlyPlaying(data))
},[currentlyPlaying && currentlyPlaying.item.name]);


useEffect(()=>{
  token &&
  fetch("https://api.spotify.com/v1/me/player/recently-played?limit=45", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) =>{
    setRecent(data.items[0].track)
    });
},[])


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToMinutesSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);

  return seconds === 60
    ? `${padTo2Digits(minutes + 1)}:00`
    : `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

  return (
    <div className='footer'>
      <div className="footer_left">
          <div className="footer_album_img">
              <img src={currentlyPlaying && currentlyPlaying.item.album.images[0].url || recent && recent.album.images[0].url } alt="fuck" />
          </div>
          <div className="footer_song_info">
                <h2>{currentlyPlaying && currentlyPlaying.item.name || recent && recent.name}</h2>
               { currentlyPlaying ? <p>{currentlyPlaying && currentlyPlaying.item.artists.map(artist => <span key={artist.id}>{ artist.name }</span>)}</p> :  <p>{recent && recent.artists.map(artist => <span key={artist.id}>{ artist.name }</span>)}</p> }
          </div>
          <FavoriteBorderIcon sx={{ fontSize: 25, color:'white' }} />
      </div>
      <div className="footer_mid">
          <div className="footer_play">
              <ShuffleIcon className='footer_play_icons' sx={{ fontSize: 25, color:'white' }}/>
              <SkipPreviousIcon className='footer_play_icons' sx={{ fontSize: 25, color:'white' }}/>
              {currentlyPlaying.is_playing ? <PauseCircleIcon className='footer_play_icons' sx={{ fontSize: 35, color:'white' }}/> : <PlayCircleIcon className='footer_play_icons' sx={{ fontSize: 35, color:'white' }}/>}
              <SkipNextIcon className='footer_play_icons' sx={{ fontSize: 25, color:'white' }}/>
              <LoopIcon className='footer_play_icons' sx={{ fontSize: 25, color:'white' }}/>
          </div>
          <div className="footer_range">
            <input type="range" />
            <p>{convertMsToMinutesSeconds(currentlyPlaying && currentlyPlaying.item.duration_ms)}</p>
          </div>
      </div>
      <div className="footer_right">
        <div className="footer_right_icons">
        <ReorderIcon className='footer_play_icons' sx={{ fontSize: 25, color:'white' }}/>
        <VolumeUpIcon  className='footer_play_icons' sx={{ fontSize: 25, color:'white' }}/>
          </div> 
          <div className="footer_right_input">
            <input type="range"/>
          </div>
      </div>
    </div>
  )
}

export default Footer
