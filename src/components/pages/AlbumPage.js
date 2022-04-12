import React,{useEffect} from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { useDataLayerValue } from '../../DataLayer';


function AlbumPage({token}) {

 const [{albumId, album, albumTracks}, dispatch] = useDataLayerValue();
 useEffect(()=>{
        fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then(resp=>{
          return resp.json()
        }).then(data=>dispatch({
          type:'SET_ALBUMTRACKS',
          albumTracks: data.items
        }))


        fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then(resp=>{
          return resp.json()
        }).then(data=>dispatch({
          type:'SET_ALBUM',
          album: data
        }))

    },[])

  return (
    <div className='playlists'>
    <div className="liked_tracks_header">
  <div className="liked_tracks_box">
  <img src={album?.images[0].url} alt="" />
  </div>

  <div className="liked_tracks_header_text">
    <p>{album?.type.toUpperCase()}</p>
    <h1>{album?.name}</h1>
    <p>{`${album?.artists.map(artist=>artist.name)} ~ ${albumTracks?.length} Songs`}</p>
  </div>
</div>

<div className="play_all_btn_container">
  <PlayCircleIcon
    className="play_all_btn"
    sx={{ fontSize: 70, color: "#1DB954" }}
  />
</div>

<div className="song_list">

  {albumTracks && albumTracks.map(track=>{
    return(
      <div key={track.id} className="song_row">
          <div className="song_album_image">
            <img src={album?.images[0].url} alt="" />
          </div>
          <div className="song_title">
            <h3>{track && track.name}</h3>
            <div className="liked_tracks_artists">
            {track && track?.artists.map((artist) => {
                      return (<p key={artist.id} className="liked_tracks_artist">{artist.name}</p>);
                    })}
            </div>
          </div>
        </div>

    )
  })}
 
        
    
</div>
</div>
      );
  
}

export default AlbumPage
