import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../DataLayer'

function Show({ token }) {
  const [{ showId }, dispatch] = useDataLayerValue();

  const [episode, setEpisode] = useState('');
  const [episodeId, setEpisodeId] = useState('');
  const [show, setShow] = useState('');

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/shows/${showId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(resp => resp.json()).then(data => setShow(data));

    fetch(`https://api.spotify.com/v1/shows/${showId}/episodes`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(resp => resp.json()).then(data => setEpisode(data.items))
  }, [])

  useEffect(()=>{
    dispatch({
      type: 'SET_EPISODEID',
      episodeId:episodeId
    })
  },[episodeId])


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
    <div className='showPage'>
      <div className="liked_tracks_header lighten">
        <div className="liked_tracks_box">
          <img src={show && show.images[0].url} alt="" />
        </div>

        <div className="liked_tracks_header_text">
          <p>{show.type}</p>
          <h1>{show?.name}</h1>
          <p>{show?.publisher}</p>
        </div>
      </div>

<div className="episode_container">


      <div className="show_episodes">
        <h1>All Episodes</h1>
        {episode && episode.map(epi => (
          <Link to={`/episode/${epi.id}`} onMouseOver={()=>setEpisodeId(epi.id)} key={epi.id} className="show_episode">
            <div className="show_episode_img">
              <img src={epi.images[0].url} alt="" />
            </div>
            <div className="show_episode_description">
              <h3>{epi.name}</h3>
              <p>{epi.description}</p>
              <h2>{`${epi.release_date} ~ ${convertMsToMinutesSeconds(epi.duration_ms)} `}</h2>
            </div>
          </Link>        
        ))}
      </div>
      <div className="about_show">
            <h1>About</h1>
            <p>{show.description}</p>
      </div>
      </div>
    </div>
  )
}

export default Show
