import React from 'react'
import { Link } from 'react-router-dom'

function AlbumCard({album}) {
  return (
    <div>
         
       <Link to={album ?`album/${album.id}` :" "}> 
                <div className="home_row_card_img">
                  <img src={album.images[0].url} alt="album" />
                </div>
                <div className="home_row_card_name">
                  <h1>{album.name}</h1>
                </div>
              </Link>
    
    </div>
  )
}

export default AlbumCard
