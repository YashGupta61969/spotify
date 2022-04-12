import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../DataLayer'
import './categoryPage.css'

function CategoryPage({id}) {
 const [{token},dispatch] = useDataLayerValue()
 const [playlist,setPlaylist] = useState('');
 const [playlistId,setPlaylistId] = useState('');
 const [CategoryName,setCategoryName] = useState('');

  useEffect(()=>{
    fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data => setPlaylist(data.playlists.items));


    fetch(`https://api.spotify.com/v1/browse/categories/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data => setCategoryName(data.name));


      
  },[]);

  useEffect(()=>{
    dispatch({
      type: 'SET_PLAYLISTID',
      playlistId:playlistId
    })
  },[playlistId])
  return (
  <div className="category_page">
    <div className="category_page_header">
      <h1>{CategoryName}</h1>
    </div>
    <div className="category_page_body">
      <h1>Playlists</h1>
    <div className="category_playlists">
      {
        playlist && playlist.map((pl)=>(
      <Link to={`/playlist/${pl.id}`} onMouseOver={()=>setPlaylistId(pl.id)} key={pl.id} className="home_row_card category_utility_margin">
        <div className="home_row_card_img">
          <img src={pl.images[0].url} alt="" />
        </div>
        <div className="home_row_card_name">
          <h1>{pl.name}</h1>
        </div>
      </Link>
        ))
      }
    </div>
    </div>
  </div>
  )
}

export default CategoryPage
