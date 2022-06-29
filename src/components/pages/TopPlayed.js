import React,{useEffect,useState} from 'react'
import { useDataLayerValue } from '../../DataLayer';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import MusicNoteIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from 'react-router-dom';


function TopPlayed({token}) {
    const[{user}] = useDataLayerValue();
    const navigate = useNavigate();
    const [myTop, setMyTop] = useState('');

    
  useEffect(()=>{

    fetch("https://api.spotify.com/v1/me/top/tracks?limit=50", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) =>{
        setMyTop(data.items)});
    },[])

  return (
    <div className='playlists'>
    <div className="liked_tracks_header">
  <div className="liked_tracks_box">
  <MusicNoteIcon sx={{ fontSize: 90 }} />
  </div>

  <div className="liked_tracks_header_text">
    <h1>Top Played</h1>
    <p>{user && user.display_name} ~ {myTop && myTop.length} Songs</p>
  </div>
</div>

<div className="play_all_btn_container">
  <PlayCircleIcon
    className="play_all_btn"
    sx={{ fontSize: 70, color: "#1DB954" }}
  />
</div>

{myTop?.length ? <div className="song_list">
  { myTop.map((song) => {
      return (
        <div key={song && song.id} className="song_row">
          <div className="song_album_image">
            <img src={song && song.album.images[0].url} alt="" />
          </div>
          <div className="song_title">
            <h3>{song && song.name}</h3>
            <div className="liked_tracks_artists">
              {song && song.artists.map((artist) => {
                return (<p onClick={()=>navigate(`/artist/${artist.id}`)} key={artist.id} className="liked_tracks_artist">{artist.name}</p>);
              })}
            </div>
          </div>
        </div>
      );
    })}
</div>:<div className="search_empty_message">
            <h1>You have'nt played any songs yet</h1>
</div>}
</div>
  )
}

export default TopPlayed
