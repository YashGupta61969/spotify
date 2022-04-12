import React,{useEffect,useState} from "react";
import "./likedTracks.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useDataLayerValue } from '../../DataLayer';


function LikedTracks({token}) {

  const[likedTracks,setLikedTracks] = useState([])
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

      <div className="play_all_btn_container">
        <PlayCircleIcon
          className="play_all_btn"
          sx={{ fontSize: 70, color: "#1DB954" }}
        />
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
                  <div className="liked_tracks_artists">
                    {likedTrack.track.artists.map((artist) => {
                      return (<p key={artist.id} className="liked_tracks_artist">{artist.name}</p>);
                    })}
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
