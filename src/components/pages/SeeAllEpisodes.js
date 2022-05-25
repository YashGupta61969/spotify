import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from "../../DataLayer";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';


function SeeAllPlaylists() {
  const [{item}] = useDataLayerValue();
  const navigate = useNavigate();
  return (
    <div className='see_all'>
      <div className="home_row">
          <div className="home_row_heading">
              <h1>Episodes</h1>
          </div>
          <div className="see_all_div">
              {item &&
        item.episodes.items.map((episode) => (
            <div
              onClick={()=>navigate(`/episode/${episode.id}`)}
              className="home_row_card margin_top"
              key={episode.id}
            >
        <div className="home_row_card_img">
        {episode?.images.length ? <img src={episode && episode.images[0].url} alt="" /> : <div className="img_avatar"><PermIdentityIcon sx={{ fontSize: 115 }} /></div>}
                </div>
                <div className="home_row_card_name">
                  <h1>{episode?.name}</h1>
                </div>
            </div>
          )
        )}
          </div>
      </div>
    </div>
  )
}

export default SeeAllPlaylists
