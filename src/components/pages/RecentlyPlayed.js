import React, {useEffect,useState} from 'react'
import { useDataLayerValue } from '../../DataLayer';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import MusicNoteIcon from "@mui/icons-material/FavoriteBorder";


function RecentlyPlayed({token}) {
    const[{user},dispatch] = useDataLayerValue();

    const [recentlyPlayed, setRecentlyPlayed] = useState('');


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
          setRecentlyPlayed(data.items)
          dispatch({
            type: 'RECENTLY_PLAYED',
            recent: data.items[0].track
          })
        });
    },[])


  return (
    <div className='playlists'>
    <div className="liked_tracks_header">
  <div className="liked_tracks_box">
  <MusicNoteIcon sx={{ fontSize: 90 }} />
  </div>

  <div className="liked_tracks_header_text">
    <h1>Recently Played</h1>
    <p>{user?.display_name} ~ {recentlyPlayed?.length} Songs</p>
  </div>
</div>

<div className="play_all_btn_container">
  <PlayCircleIcon
    className="play_all_btn"
    sx={{ fontSize: 70, color: "#1DB954" }}
  />
</div>

<div className="song_list">
  {recentlyPlayed &&
    recentlyPlayed.map((song) => {
      return (
        <div key={song?.track.id} className="song_row">
          <div className="song_album_image">
            <img src={song?.track.album.images[0].url} alt="" />
          </div>
          <div className="song_title">
            <h3>{song?.track.name}</h3>
            <div className="liked_tracks_artists">
              {song?.track.artists.map((artist) => {
                return (<p key={artist.id} className="liked_tracks_artist">{artist.name}</p>);
              })}
            </div>
          </div>
        </div>
      );
    })}
</div>
</div>
  )
}

export default RecentlyPlayed
