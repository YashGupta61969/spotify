import React, { useState } from 'react'
import { useDataLayerValue } from '../../DataLayer'
import AlbumCard from './AlbumCard';

function NewReleases() {
const[{newReleases}]= useDataLayerValue();

const [local, setLocal] = useState("");
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
            onMouseOver={()=>setLocal(album && album.id)}
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
