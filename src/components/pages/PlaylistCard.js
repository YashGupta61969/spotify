import React from 'react'

function PlaylistCard({ playlist}) {
  return (
    <div>
                <div className="home_row_card_img">
                  <img src={ playlist?.images[0].url} alt="playlist" />
                </div>
                <div className="home_row_card_name">
                  <h1>{playlist?.name}</h1>
                </div>
    </div>
  )
}

export default PlaylistCard
