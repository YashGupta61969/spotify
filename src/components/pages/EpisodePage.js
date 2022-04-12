import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../../DataLayer';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "./episodePage.css";
import { Link } from 'react-router-dom';

function EpisodePage({token}) {
    const [{episodeId},dispatch] = useDataLayerValue();
    const [episode,setEpisode] = useState('');
    const [showId,setShowId] = useState('');

    useEffect(()=>{
        fetch(`https://api.spotify.com/v1/episodes/${episodeId}`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }).then(resp=>resp.json()).then(data=>setEpisode(data))

    },[])
    
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
    
      function convertMsToMinutesSeconds(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.round((milliseconds % 60000) / 1000);
    
        return seconds === 60
          ? `${padTo2Digits(minutes + 1)} min`
          : `${padTo2Digits(minutes)} min ${padTo2Digits(seconds)} sec`;
      }

      useEffect(()=>{
        dispatch({
          type:"SET_SHOWID",
          showId:showId
        })
      },[showId])

  return (
      <div className="episodePage">
    <div className="liked_tracks_header lighten">
        <div className="liked_tracks_box">
          <img src={episode && episode.images[0].url} alt="" />
        </div>

        <div className="liked_tracks_header_text">
          <p>{episode.type}</p>
          <h1>{episode?.name}</h1>
          <p>{episode?.show?.name}</p>
        </div>
      </div>

      <div className="play_all_btn_container">
          <p className='episode_duration'>{episode.release_date} <span>{convertMsToMinutesSeconds(episode.duration_ms)}</span></p>
        <PlayCircleIcon
          className="play_all_btn"
          sx={{ fontSize: 70, color: "#1DB954" }}
        />
      </div>
      <div className="episode_description">
            <h1>Episode Description</h1>
            <p>{episode.description}</p>
            <Link to={`/show/${episode && episode.show.id}`} onMouseOver={()=>setShowId(episode && episode.show.id)}>SEE ALL EPISODES</Link>
      </div>
      </div>
  )
}

export default EpisodePage
