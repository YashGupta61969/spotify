import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import "./artistPage.css";
import { useDataLayerValue } from "../../DataLayer";

function ArtistPage({token}) {
  const[{artistId}, dispatch]=useDataLayerValue();

  const [tracks, setTracks] = useState("");
  const [artistAlbum, setArtistAlbum] = useState("");
  const [albumId, setAlbumId] = useState("");
  // const [artistId, setArtistId] = useState("");
  const [relatedArtist, setRelatedArtist] = useState("");
  const [data, setData] = useState("");

  
  useEffect(() => {
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data => setData(data))
  }, [data])

  useEffect(()=>{
    fetch(`https://api.spotify.com/v1/artists/${data.id}/top-tracks?market=ES`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data=>setTracks(data.tracks));


    fetch(`https://api.spotify.com/v1/artists/${data.id}/albums?limit=5`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data=>setArtistAlbum(data.items))


    fetch(` https://api.spotify.com/v1/artists/${data.id}/related-artists`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      }).then(data=>setRelatedArtist(data.artists))
  },[data, token]);


  useEffect(()=>{
    dispatch({
      type: 'SET_ALBUMID',
      albumId:albumId
    })
  },[albumId]);


  // useEffect(()=>{
  //   dispatch({
  //     type: 'SET_ARTISTID',
  //     artistId:artistId
  //   });
  //     },[artistId])


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
            <img src={data && data.images[0].url} alt="" />
          </div>
          <div className="liked_tracks_header_text">
            <p>ARTIST</p>
            <h1>{data && data.name}</h1>
          </div>
        </div>
        <div className="play_all_btn_container">
          <PlayCircleIcon
            className="play_all_btn"
            sx={{ fontSize: 70, color: "#1DB954" }}
          />
        </div>

        <div className="search_result_tracks_column padding_left">
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
                       <p>{track.artists.map((art,index) => index <4 &&(<span key={art.id}>{art.name}</span>) )}</p>
                      </div>
                      <div className="track_length">
                        <p>{convertMsToMinutesSeconds(track.duration_ms)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="home_row margin_top">
        <div className="home_row_heading">
          <h1>ALBUMS</h1>
          <p>SEE ALL</p>
        </div>
        <div className="home_row_cards">

          {artistAlbum && artistAlbum.map((album) =>(
            <div onMouseOver={()=>setAlbumId(album.id)} key={album.id} className="home_row_card">
              <Link to={`/album/${album.id}`} >
              <div className="home_row_card_img">
               {album.images[0]?.url? <img src={album && album.images[0]?.url} alt="album" />: <div className="img_avatar"><PermIdentityIcon className="alt_avatar" sx={{ fontSize: 115 }} /></div>}
              </div>
              <div className="home_row_card_name">
                <h1>{album.name}</h1>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>


        <h1 className="no_parent">Related Artists</h1>
      <div className="library_container margin_left">
        {relatedArtist &&
          relatedArtist.map((artist, index) =>index< 5 && (
              <div key={artist.id}>
              <div className="library_artist">
                <div className="library_artist_img">
                  <img src={artist.images[0].url} alt="" />
                </div>
                <div className="library_artist_name">
                  <h1>{artist.name}</h1>
                </div>
              </div>
              </div>
            )
          )}
      </div>

  </div>
  );
}

export default ArtistPage;
