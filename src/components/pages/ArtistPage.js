import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import "./artistPage.css";

function ArtistPage({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tracks, setTracks] = useState("");
  const [artistAlbum, setArtistAlbum] = useState("");
  const [relatedArtist, setRelatedArtist] = useState("");
  const [data, setData] = useState("");


  useEffect(() => {
    fetch(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(resp => resp.json()).then(data => setData(data))
  }, [id])

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/artists/${data.id}/top-tracks?market=ES`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data => setTracks(data.tracks));


    fetch(`https://api.spotify.com/v1/artists/${data.id}/albums?limit=5`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data => setArtistAlbum(data.items))

    fetch(`https://api.spotify.com/v1/artists/${data.id}/related-artists`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data => setRelatedArtist(data.artists)).catch(err => console.log(err))
  }, [data]);


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
    <div className="playlists">
      <div className="liked_tracks_header">
        <div className="artist_page_dp">
          {data?.images?.length ? <img src={data.images[0].url} alt="" /> : <div className="artist_alt_avatar"><PermIdentityIcon sx={{ fontSize: 145 }} /></div>}
        </div>
        <div className="liked_tracks_header_text">
          <p>ARTIST</p>
          <h1>{data && data.name}</h1>
          <p>{data && data.followers.total} followers</p>
        </div>
      </div>

      {tracks?.length && <div className="search_result_tracks_column padding_left">
        <h1>Popular</h1>
        {
          tracks && tracks.map((track, index) => index < 5 && (
            <div key={track.id}>
              <div className="search_result_track">
                <div className="search_result_track_img">
                  <img src={track.album.images[0].url} alt="" />
                </div>
                <div className="search_result_track_info">
                  <div className="sample">
                    <h3>{track.name}</h3>
                    <div className="liked_tracks_artists">
                      {track && track.artists.map((art, index) => index < 4 && (<p className="liked_tracks_artist" onClick={() => navigate(`/artist/${art.id}`)} key={art.id}>{art.name}</p>))}
                    </div>
                  </div>
                  <div className="track_length">
                    <p>{convertMsToMinutesSeconds(track.duration_ms)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>}

      {artistAlbum?.length && <div className="home_row margin_top">
        <div className="home_row_heading">
          <h1>ALBUMS</h1>
          <p>SEE ALL</p>
        </div>
        <div className="home_row_cards">

          {artistAlbum && artistAlbum.map((album) => (

            <div onClick={() => navigate(`/album/${album.id}`)} key={album.id} className="home_row_card">
              <div className="home_row_card_img">
                {album.images[0]?.url ? <img src={album && album.images[0]?.url} alt="album" /> : <div className="img_avatar"><PermIdentityIcon className="alt_avatar" sx={{ fontSize: 115 }} /></div>}
              </div>
              <div className="home_row_card_name">
                <h1>{album.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>}


      {relatedArtist?.length && <div className="home_row">
        <div className="home_row_heading">
          <h1>Related Artists</h1>
        </div>
        <div className="home_row_cards">
          {relatedArtist &&
            relatedArtist.map((artist, index) => index < 5 && (

              <div onClick={() => navigate(`/artist/${artist.id}`)} key={artist.id} className="home_row_card">
                <div className="home_row_card_img">
                  {artist?.images.length ? <img src={artist.images[0].url} alt="" /> : <div className="img_avatar"><PermIdentityIcon className="alt_avatar" sx={{ fontSize: 115 }} /></div>}
                </div>
                <div className="home_row_card_name">
                  <h1>{artist.name}</h1>
                </div>
              </div>

            )
            )}
        </div>
      </div>}

    </div>
  );
}

export default ArtistPage;
