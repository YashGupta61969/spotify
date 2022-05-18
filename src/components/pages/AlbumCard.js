import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AlbumCard({album}) {
  const navigate = useNavigate();
  return (
    <div>
         
       <div onClick={()=>navigate(`/album/${album.id}`)}> 
                <div className="home_row_card_img">
                  <img src={album.images[0].url} alt="album" />
                </div>
                <div className="home_row_card_name">
                  <h1>{album.name}</h1>
                </div>
              </div>
    
    </div>
  )
}

export default AlbumCard
