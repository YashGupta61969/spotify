import React, {useEffect, useState} from 'react'
import './sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
// import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from 'react-router-dom' 
import { useDataLayerValue } from '../DataLayer';


function Sidebar({token}) {
const [{screenSize, toggleSidebar}, dispatch] = useDataLayerValue();
const [myPlaylists, setMyplaylists] = useState([]);

useEffect(()=>{
  const getMyPlaylists = async ()=>{
    let resp = await fetch("https://api.spotify.com/v1/me/playlists",{
      method:'GET',
      headers: {
      "Authorization" : "Bearer " + token
      } 
    })
    let data = await resp.json();
    setMyplaylists(data.items);
  }   
  getMyPlaylists();
},[])

useEffect(()=>{
  dispatch({
       type: 'SET_MYPLAYLISTS',
       myPlaylists: myPlaylists
     })
},[myPlaylists])

  return (
    <>
   { (screenSize >1000 || toggleSidebar ) && <div className='sidebar'>
    {screenSize > 1000 && <div className="sidebar_logo">
        <img src={require('./spotifyLogo.png')} alt="" />
      </div>}



      <div className="sidebar_menu">

        <Link to='/' className="sidebar_menu_row">
        <HomeIcon sx={{ fontSize: 32 }} />
        <h2>Home</h2>
        </Link>
        <Link to={`search`} className="sidebar_menu_row">
        <SearchIcon sx={{ fontSize: 32 }} />
        <h2>Search</h2>
        </Link>
        <Link to='/library' className="sidebar_menu_row">
        <LibraryMusicIcon sx={{ fontSize: 32 }} />
        <h2>Library</h2>
        </Link>


      </div>
      <div className="sidebar_menu">
      {/* <div className="sidebar_menu_row">
        <AddBoxIcon sx={{ fontSize: 32 }} />
        <a href='/'>Create Playlist</a>
        </div> */}
      <Link to='/likedtracks' className="sidebar_menu_row">
        <FavoriteBorderIcon sx={{ fontSize: 32 }} />
        <h2>Liked Songs</h2>
        </Link>
      </div>

      <hr />

      <div className="sidebar_menu">
{
 myPlaylists.length && myPlaylists.map(playlist =>{
   return (   
     
     <div key={playlist.id} className='sidebar_playlists'>
      <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
    </div>
    )
  })
}

      
      </div>

    </div>}
    </>
  )
}

export default Sidebar
