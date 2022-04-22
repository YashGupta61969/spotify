import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


function AlbumPage({ token }) {

  const [album, setAlbum] = useState(undefined)
  const [albumTracks, setAlbumTracks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(resp => {
      return resp.json()
    }).then(data => setAlbumTracks(data.items))


    fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(resp => {
      return resp.json()
    }).then(data => setAlbum(data))

  }, [])

  return (
    <div className='playlists'>
      <div className="liked_tracks_header">
        <div className="liked_tracks_box">
          <img src={album?.images[0].url} alt="" />
        </div>

        <div className="liked_tracks_header_text">
          <p>{album?.type.toUpperCase()}</p>
          <h1>{album?.name}</h1>
          <p>{`${album?.artists.map(artist => artist.name)} ~ ${albumTracks?.length} Songs`}</p>
        </div>
      </div>

      <div className="song_list">
        {albumTracks && albumTracks.map(track => {
          return (
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