import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function LibraryAlbums({token}) {

  const navigate = useNavigate();
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
    <div className='see_all'>
      <div className="home_row">
      <div className="home_row_heading">
        <h1>ALBUMS</h1>
      </div>

      <div className="see_all_div">

        {
          albums && albums.map(album=>{
            return(
              <div onClick={()=>navigate(`/album/${album.album.id}`)} key={album.album.id}>
              <div className="home_row_card margin_top">
              <div className="home_row_card_img">
                <img src={album.album.images[0].url} alt="album" />
              </div>

              <div className="home_row_card_name">
                <h1>{album.album.name}</h1>
              </div>

            </div>
            </div>
              
            )
          })
        }

      </div>
      </div>
    </div>
  )
}

export default LibraryAlbums
