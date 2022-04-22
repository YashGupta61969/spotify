import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../DataLayer'

function LibraryPlaylist({token}) {

  const [likedTracks,setLikedTracks] = useState("");
  const [myPlaylists,setMyPlaylists] = useState("");

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


        const getMyPlaylists = async ()=>{
          let resp = await fetch("https://api.spotify.com/v1/me/playlists",{
            method:'GET',
            headers: {
            "Authorization" : "Bearer " + token
            } 
          })
          let data = await resp.json();
          setMyPlaylists(data.items);
      }   
         getMyPlaylists();
  }, []);

  return (
    <div className='library_main'>
     <div className="library_head">
         <h1>PLAYLISTS</h1>
         </div>

         <div className="library_container">
         <Link to={'/likedtracks'} className="library_playlists_liked">
             <h1>LIKED SONGS</h1>
             <p>{`${likedTracks} Songs`}</p>
             </Link>

           {  myPlaylists && myPlaylists.map(playlist=>{
             return (
                 <Link key={playlist.id} to={`/playlist/${playlist.id}`} >
                 <div className="home_row_card library_playlist_card" >
                <div className="home_row_card_img">
                    <img src={playlist.images[0].url} alt="" />
                    </div>
                <div className="home_row_card_name">
                    <h1>{playlist.name}</h1>
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

export default LibraryPlaylist
