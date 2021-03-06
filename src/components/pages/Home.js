import React, { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import "./home.css";
import { useDataLayerValue } from "../../DataLayer";
import HomeRow from "./HomeRow";
import AlbumRow from "./AlbumRow";
import { useNavigate } from "react-router-dom";

function Home() {
  const [{ token, myPlaylists }] = useDataLayerValue();

  const navigate = useNavigate();
  const [newReleases, setNewReleases] = useState([]);
  const [featuredPlaylist, setFeaturedPlaylist] = useState([]);

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
        .then((data) =>setFeaturedPlaylist(data.playlists.items));

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
        .then((data) => setNewReleases(data.albums.items));
      }, []);

const greetings = ()=>{
  const date = new Date();
  const hours = date.getHours();
  if(hours >= 0 && hours <= 6){
    return 'Night'
  }else if(hours > 6 && hours < 12){
    return 'Morning'
  }else if(hours > 12 && hours < 18){
    return 'Afternoon'
  }else{return 'Evening'}
}


  return (
    <div className="home">

      <div className="home_greeting">
        <h1>Good {greetings()}</h1>
      </div>

<div className="home_main_cards">
  <div onClick={()=>navigate('likedtracks')} className="home_main_card">

    <div className="home_main_card_liked">
    <FavoriteIcon sx={{ fontSize: 30, color:'white' }} />
    </div>
    <div className="home_main_card_title">
      <p>Liked Songs</p>
    </div>

  </div>


  <div  onClick={()=>navigate('recently-played')} className="home_main_card">
    <div className="home_main_card_liked">
    <MusicNoteIcon sx={{ fontSize: 30, color:'white' }} />
    </div>
    <div className="home_main_card_title">
      <p>Recently Played</p>
    </div>
  </div>


  <div onClick={()=>navigate('top-played')} className="home_main_card">
    <div className="home_main_card_liked">
    <MusicNoteIcon sx={{ fontSize: 30, color:'white' }} />
    </div>
    <div className="home_main_card_title">
      <p>Top Played</p>
    </div>
  </div>

{
  myPlaylists.length && myPlaylists.map((playlist, index)=> index < 3 &&(
      <div onClick={()=>navigate(`playlist/${playlist.id}`)} key={playlist.id} className="home_main_card">
      <div className="home_main_card_liked">
      <img src={playlist.images[0].url} alt="" />
      </div>
      <div className="home_main_card_title">
        <p>{playlist.name}</p>
      </div>
    </div>
    )
  )
}

</div>

      <div className="home_row">
        <div className="home_row_heading">
          <h1>Recommended Playlists</h1>
          <h2 onClick={()=>navigate('recommended-playlists')}>SEE ALL</h2>
        </div>
        <div className="home_row_cards">
          <HomeRow featuredPl={featuredPlaylist} />
        </div>
      </div>

      <div className="home_row">
        <div className="home_row_heading">
          <h1>New Releases</h1>
          <h2 onClick={()=>navigate('new-releases')}>SEE ALL</h2>
        </div>
        <div className="home_row_cards">
          <AlbumRow albums={newReleases} />
        </div>
      </div>
    </div>
  );
}

export default Home;
