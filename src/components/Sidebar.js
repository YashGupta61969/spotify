import React, {useEffect, useState} from 'react'
import './sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
// import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from 'react-router-dom' 
import { useDataLayerValue } from '../DataLayer';
// import MenuIcon from '@mui/icons-material/Menu';



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

        <div className="sidebar_menu_row">
        <HomeIcon sx={{ fontSize: 30 }} />
        <Link to='/'>Home</Link>
        </div>
        <div className="sidebar_menu_row">
        <SearchIcon sx={{ fontSize: 30 }} />
        <Link to={`search`}>Search</Link>
        </div>
        <div className="sidebar_menu_row">
        <LibraryMusicIcon sx={{ fontSize: 30 }} />
        <Link to='/library'>Library</Link>
        </div>


      </div>
      <div className="sidebar_menu">
      {/* <div className="sidebar_menu_row">
        <AddBoxIcon sx={{ fontSize: 30 }} />
        <a href='/'>Create Playlist</a>
        </div> */}
      <div className="sidebar_menu_row">
        <FavoriteBorderIcon sx={{ fontSize: 30 }} />
        <Link to='/likedtracks'>Liked Songs</Link>
        </div>
      </div>

      <hr />

      <div className="sidebar_menu">
{
 myPlaylists && myPlaylists.map(playlist =>{
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
