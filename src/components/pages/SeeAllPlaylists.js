import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from "../../DataLayer";
import PlaylistCard from './PlaylistCard';


function SeeAllPlaylists() {
  const [{item}] = useDataLayerValue();
  const navigate = useNavigate();
  return (
    <div className='see_all'>
      <div className="home_row">
          <div className="home_row_heading">
              <h1>Playlists</h1>
          </div>
          <div className="see_all_div">
              {item &&
        item.playlists.items.map((playlist) => (
            <div
              onClick={()=>navigate(`/playlist/${playlist.id}`)}
              className="home_row_card margin_top"
              key={playlist.id}
            >
         <PlaylistCard playlist={playlist}/>
            </div>
          )
        )}
          </div>
      </div>
    </div>
  )
}

export default SeeAllPlaylists
