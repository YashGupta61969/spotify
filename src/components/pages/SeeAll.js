import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PlaylistCard from './PlaylistCard';

function SeeAll({token}) {
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    if(token){
        fetch('https://api.spotify.com/v1/browse/featured-playlists', {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) =>resp.json()).then(NR=>setPlaylists(NR.playlists.items))
        }    
      },[]);
  return (
    <div className='see_all'>
      <div className="home_row">
        <div className="home_row_heading">
          <h1>Recommended Playlists</h1>
        </div>
        <div className="see_all_div">
        {playlists &&
        playlists.map((playlist) => (
            <Link
              to={`/playlist/${playlist.id}`}
              className="home_row_card margin_top"
              key={playlist.id}
            >
         <PlaylistCard playlist={playlist}/>
            </Link>
          )
        )}
        </div>
      </div>
    </div>
  )
}
 
export default SeeAll
