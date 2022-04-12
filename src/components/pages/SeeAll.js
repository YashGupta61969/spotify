import React, { useState } from 'react'
import { useDataLayerValue } from '../../DataLayer'
import PlaylistCard from './PlaylistCard';

function SeeAll() {
    const[{featuredPl}]=useDataLayerValue();
    const [local, setLocal] = useState("");
    console.log(featuredPl)
  return (
    <div className='see_all'>
      <div className="home_row">
        <div className="home_row_heading">
          <h1>Recommended Playlists</h1>
        </div>
        <div className="see_all_div">
        {featuredPl &&
        featuredPl.map((playlist) => (
            <div
              onMouseOver={()=>setLocal(playlist.id && playlist.id)}
              className="home_row_card margin_top"
              key={playlist.id}
            >
         <PlaylistCard local={local} playlist={playlist}/>
            </div>
          )
        )}
        </div>
      </div>
    </div>
  )
}
 
export default SeeAll
