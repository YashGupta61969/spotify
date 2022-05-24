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
              <h1>Artists</h1>
          </div>
          <div className="see_all_div">
              {item &&
        item.artists.items.map((artist) => (
            <div
              onClick={()=>navigate(`/artist/${artist.id}`)}
              className="home_row_card margin_top"
              key={artist.id}
            >
        <div className="home_row_card_img">
        {artist?.images.length ? <img src={artist && artist.images[0].url} alt="" /> : <div className="img_avatar"><PermIdentityIcon sx={{ fontSize: 115 }} /></div>}
                </div>
                <div className="home_row_card_name">
                  <h1>{artist?.name}</h1>
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
