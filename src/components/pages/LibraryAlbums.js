import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function LibraryAlbums({token}) {

 const [albums, setAlbums] = useState();
  useEffect(()=>{
   token && fetch("https://api.spotify.com/v1/me/albums", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(resp=>resp.json()).then(data=>setAlbums(data.items));
  },[])

  return (
    <div className='library_main'>
      <div className="library_head">
        <h1>ALBUMS</h1>
      </div>

      <div className="library_container">

        {
          albums && albums.map(album=>{
            return(
              <Link key={album.album.id} to={`/album/${album.album.id}`}>
              <div className="home_row_card library_playlist_card">
              <div className="home_row_card_img">
                <img src={album.album.images[0].url} alt="album" />
              </div>

              <div className="home_row_card_name">
                <h1>{album.album.name}</h1>
              </div>

            </div>
            </Link>
              
            )
          })
        }

      </div>
      
    </div>
  )
}

export default LibraryAlbums
