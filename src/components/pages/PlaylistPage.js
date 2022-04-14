import React,{useEffect, useState} from 'react'
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import './likedTracks.css'
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

function PlaylistPage({token}) {

 const [{ playlist, playlistId, user}, dispatch] = useDataLayerValue();
 const [artistId, setArtistId] = useState('')
 
 useEffect(() => {
    if(token){
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => {
            return resp.json();
          }).then(pl=>{
            dispatch({
              type: 'SET_PLAYLIST',
              playlist: pl
            })
          })

        }

        
      },[playlistId ]);

      useEffect(()=>{
        dispatch({
          type:"SET_ARTISTID",
          artistId:artistId
      })
      },[artistId])
      
      
      return (
        <div className='playlists'>
          <div className="liked_tracks_header">
        <div className="liked_tracks_box">
          <img src={playlist?.images[0].url} alt="" />
        </div>

        <div className="liked_tracks_header_text">
          <p>PLAYLIST</p>
          <h1>{playlist?.name}</h1>
          <p>{user?.display_name} ~ {playlist?.tracks.items.length} Songs</p>
        </div>
      </div>

      <div className="play_all_btn_container">
        <PlayCircleIcon
          className="play_all_btn"
          sx={{ fontSize: 70, color: "#1DB954" }}
        />
      </div>

      <div className="song_list">
        {playlist &&
          playlist.tracks.items.map((playlistSong) => {
            return (
              <div key={playlistSong.track.id} className="song_row">
                <div className="song_album_image">
                  <img src={playlistSong.track.album.images[0].url} alt="" />
                </div>
                <div className="song_title">
                  <h3>{playlistSong.track.name}</h3>
                  <div className="liked_tracks_artists">
                    {playlistSong.track.artists.map((artist) => {
                      return (<Link to={`/artist/${artist.id}`} onMouseOver={()=>setArtistId(artist.id)} key={artist.id} className="liked_tracks_artist">{artist.name}</Link>);
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export default PlaylistPage
