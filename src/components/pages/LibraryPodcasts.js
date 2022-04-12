import React from 'react'
import PodcastsIcon from '@mui/icons-material/Podcasts';  

function LibraryPodcasts() {

  return (
    <div className='library_podcasts'>
        <div className="podcast_empty">
          <div className="podcast_empty_icon"><PodcastsIcon sx={{ fontSize: 80, color: "white" }}/></div>
        <div className="playlist_empty_text">
          <h1>Follow your first podcast</h1>
          <p>No Saved Podcasts Found.</p>
          {/* <button>FIND PODCASTS</button> */}
          </div>
        </div>
    </div>
  )
}

export default LibraryPodcasts
