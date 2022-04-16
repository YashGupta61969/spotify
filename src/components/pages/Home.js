import React, { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import "./home.css";
import { useDataLayerValue } from "../../DataLayer";
import HomeRow from "./HomeRow";
import AlbumRow from "./AlbumRow";
import { Link } from "react-router-dom";

function Home() {
  const [{ token, featuredPl,myPlaylists, newReleases }, dispatch] = useDataLayerValue();
  const [date, setDate] = useState();
  const [playlistId, setPlaylistId] = useState('');

  useEffect(() => {
    token &&
      fetch("https://api.spotify.com/v1/browse/featured-playlists", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          dispatch({
            type: "SET_FEATURED_PLAYLISTS",
            featuredPl: data.playlists.items,
          });
        });

    token &&
      fetch("https://api.spotify.com/v1/browse/new-releases?limit=50", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          dispatch({
            type: "NEW_RELEASES",
            newReleases: data.albums.items,
          });
        });

      }, []);

      useEffect(()=>{
        dispatch({
          type: 'SET_PLAYLISTID',
          playlistId: playlistId
        })
      },[playlistId])

      useEffect(()=>{
const greetings = ()=>{
  const date = new Date();
  const hours = date.getHours();
  if(hours <= 5 && hours <= 0){
    return 'Night'
  }else if(hours > 5 && hours < 12){
    return 'Morning'
  }else if(hours > 12 && hours < 4){
    return 'Afternoon'
  }else{return 'Evening'}
}
setDate(greetings());

  }, [date]);

  return (
    <div className="home">

      <div className="home_greeting">
        <h1>Good {date}</h1>
      </div>

<div className="home_main_cards">
  <Link to={'likedtracks'} className="home_main_card">

    <div className="home_main_card_liked">
    <FavoriteIcon sx={{ fontSize: 30, color:'white' }} />
    </div>
    <div className="home_main_card_title">
      <p>Liked Songs</p>
    </div>

  </Link>


  <Link to={'recently-played'} className="home_main_card">
    <div className="home_main_card_liked">
    <MusicNoteIcon sx={{ fontSize: 30, color:'white' }} />
    </div>
    <div className="home_main_card_title">
      <p>Recently Played</p>
    </div>
  </Link>


  <Link to={'top-played'} className="home_main_card">
    <div className="home_main_card_liked">
    <MusicNoteIcon sx={{ fontSize: 30, color:'white' }} />
    </div>
    <div className="home_main_card_title">
      <p>Top Played</p>
    </div>
  </Link>

{
  myPlaylists && myPlaylists.map((playlist, index)=> index < 3 &&(
      <Link to={`playlist/${playlist.id}`} onMouseEnter={()=>setPlaylistId(playlist.id)} key={playlist.id} className="home_main_card">
      <div className="home_main_card_liked">
      <img src={playlist.images[0].url} alt="" />
      </div>
      <div className="home_main_card_title">
        <p>{playlist.name}</p>
      </div>
    </Link>
    )
  )
}

</div>

      <div className="home_row">
        <div className="home_row_heading">
          <h1>Recommended Playlists</h1>
          <Link to={'recommended-playlists'}>SEE ALL</Link>
        </div>
        <div className="home_row_cards">
          <HomeRow featuredPl={featuredPl} />
        </div>
      </div>

      <div className="home_row">
        <div className="home_row_heading">
          <h1>New Releases</h1>
          <Link to={'new-releases'}>SEE ALL</Link>
        </div>
        <div className="home_row_cards">
          <AlbumRow albums={newReleases} />
        </div>
      </div>
    </div>
  );
}

export default Home;
