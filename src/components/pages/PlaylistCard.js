import React from 'react'
import {Link} from 'react-router-dom'

function PlaylistCard({local, playlist}) {
  return (
    <div>
       <Link to={local ?`playlist/${playlist.id}` :" "}> 
                <div className="home_row_card_img">
                  <img src={playlist.images[0].url} alt="playlist" />
                </div>
                <div className="home_row_card_name">
                  <h1>{playlist.name}</h1>
                </div>
              </Link>
    </div>
  )
}

export default PlaylistCard
