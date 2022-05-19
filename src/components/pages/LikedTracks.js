import React,{useEffect,useState} from "react";
import "./likedTracks.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDataLayerValue } from '../../DataLayer';
import {useNavigate } from "react-router-dom";


function LikedTracks({token}) {

  const[likedTracks,setLikedTracks] = useState([])
  const navigate = useNavigate()
  const [{user}] = useDataLayerValue()

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
        .then((data) =>setLikedTracks(data.items));
  }, []);

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
    <div className="liked_tracks">
      <div className="liked_tracks_header">
        <div className="liked_tracks_box">
          <FavoriteBorderIcon sx={{ fontSize: 90 }} />
        </div>

        <div className="liked_tracks_header_text">
          <p>PLAYLIST</p>
          <h1>Liked Songs</h1>
          <p>{user?.display_name} ~ {likedTracks?.length} Songs</p>
        </div>
      </div>

      <div className="song_list">
        {likedTracks &&
          likedTracks.map((likedTrack) => {
            return (
              <div key={likedTrack.track.id} className="song_row">
                <div className="song_album_image">
                  <img src={likedTrack.track.album.images[0].url} alt="" />
                </div>
                <div className="song_title">
                  <h3>{likedTrack.track.name}</h3>
                  <p className="liked_duration">{convertMsToMinutesSeconds(likedTrack.track.duration_ms  )}</p>
                  <div className="liked_tracks_artists">
                    {likedTrack.track.artists.map((artist, index) => 
                     index < 3 && (<p onClick={()=>navigate(`/artist/${artist.id}`)} key={artist.id} className="liked_tracks_artist">{artist.name}</p>)
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LikedTracks;
