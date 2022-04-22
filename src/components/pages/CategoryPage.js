import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom';
import './categoryPage.css'

function CategoryPage({token}) {
 const [playlist,setPlaylist] = useState('');
 const [CategoryName,setCategoryName] = useState('');
 const {id} = useParams();

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
      .then(resp=> resp.json()).then(data => setCategoryName(data.name));
    
  },[]);
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
      <Link to={`/playlist/${pl.id}`} key={pl.id} className="home_row_card category_utility_margin">
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
