import React,{useEffect, useState} from 'react'
import './likedTracks.css'
import { useNavigate, useParams } from 'react-router-dom';

function PlaylistPage({token}) {

  const navigate = useNavigate();
 const [playlist, setPlaylist] = useState(undefined)
 const {id} = useParams();
 
 useEffect(() => {
    if(token){
        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => {
            return resp.json();
          }).then(pl=>setPlaylist(pl))
        }    
      },[id]);

      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
    
      function convertMsToMinutesSeconds(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.round((milliseconds % 60000) / 1000);
    
        return seconds === 60
          ? `${padTo2Digits(minutes + 1)}:00`
          : `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      }
      
      return (
        <div className='playlists'>
    <div className="liked_tracks_header">
        <div className="liked_tracks_box">
          <img src={playlist?.images[0].url} alt="" />
        </div>

        <div className="liked_tracks_header_text">
          <p>PLAYLIST</p>
          <h1>{playlist?.name}</h1>
          <p className='liked_tracks_playlist_description'>{playlist?.description}</p>
          <p>{playlist?.owner.display_name} - {playlist?.tracks.items.length} Songs</p>
        </div>
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
                  <p className="liked_duration">{convertMsToMinutesSeconds(playlistSong.track.duration_ms)}</p>
                  <div className="liked_tracks_artists">
                    {playlistSong.track.artists.map((artist) => {
                      return (<p onClick={()=>navigate(`/artist/${artist.id}`)} key={artist.id} className="liked_tracks_artist">{artist.name}</p>);
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
