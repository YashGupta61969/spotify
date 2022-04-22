import React, {useState, useEffect} from 'react'
import AlbumCard from './AlbumCard';

function NewReleases({token}) {
  const [newReleases, setNewReleases] = useState([])
  useEffect(() => {
    if(token){
        fetch('https://api.spotify.com/v1/browse/new-releases', {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) =>resp.json()).then(NR=>setNewReleases(NR.albums.items))
        }    
      },[]);
  return (
    <div className='see_all'>
    <div className="home_row">
      <div className="home_row_heading">
        <h1>New Releases</h1>
      </div>
      <div className="see_all_div">
      {newReleases &&
      newReleases.map((album) => (
          <div
            className="home_row_card margin_top"
            key={album.id}
          >
       <AlbumCard album={album} />
          </div>
        )
      )}
      </div>
    </div>
  </div>
  )
}

export default NewReleases
