import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from "../../DataLayer";


function LibraryPlaylist({token}) {

  const [{ myPlaylists }] = useDataLayerValue();

  const navigate = useNavigate();
  const [likedTracks,setLikedTracks] = useState("");

  useEffect(() => {
    const url = `https://api.spotify.com/v1/me/tracks?limit=50`;
    token &&
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) =>setLikedTracks(data.items.length));
  }, []);

  return (
    <div className='library_main'>
     <div className="library_head">
         <h1>PLAYLISTS</h1>
         </div>

         <div className="library_container">
         <div onClick={()=>navigate('/likedtracks')} className="library_playlists_liked">
             <h1>LIKED SONGS</h1>
             <p>{`${likedTracks} Songs`}</p>
             </div>

             <div style={{marginLeft:'2rem'}} className={`see_all_div ${window.innerWidth >= 800 && 'home_row -margin_left'}`}>
           {  myPlaylists && myPlaylists.map(playlist=>{
             return (
                 <div style={{marginTop:'2rem'}} onClick={()=>navigate(`/playlist/${playlist.id}`)} className='home_row_card' key={playlist.id}>
                <div className="home_row_card_img">
                    <img src={playlist.images[0].url} alt="" />
                    </div>
                <div className="home_row_card_name">
                    <h1>{playlist.name}</h1>
                    </div>

            </div>
               
               )})}
</div>
            </div>
         
    </div>
  )
}

export default LibraryPlaylist
