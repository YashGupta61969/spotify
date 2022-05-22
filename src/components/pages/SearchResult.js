import React from "react";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {useNavigate } from "react-router-dom";

function SearchResult({ data }) {

  const navigate = useNavigate();

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
    <div className="result_page">
      <div className="search_page_top_row">
        <div className="top_result">
          <h1>Top Result</h1>
          <div className="top_result_card">
            <div className="top_result_img">
              <img
                src={data && data.tracks.items[0].album.images[0]?.url}
                alt="banana"
              />
            </div>
            <div className="top_result_track_info">
              <h1>{data && data.tracks.items[0].name}</h1>
              <div className="search_artist">
                {data &&
                  data.tracks.items[0].artists.map((art,index) => index<4 && (
                    <p onClick={()=>navigate(`/artist/${art.id}`)} key={art.id}>{art.name}</p>
                  ))}
              </div>

            </div>
          </div>
        </div>

        <div className="search_tracks">
          <div className="search_tracks_main_text">
            <h1>Songs</h1>
            <h2 onClick={()=>navigate('search-results')}>SEE ALL</h2>
          </div>
          <div className="search_result_tracks_column">
            {
              data && data.tracks.items.map((track, index) => index < 4 && (
                <div key={track.id}>
                  <div className="search_result_track">
                    <div className="search_result_track_img">
                      <img src={track.album.images[0].url} alt="" />
                    </div>
                    <div className="search_result_track_info">
                      <div className="sample">
                        <h3>{track.name}</h3>
                       <p>{track.artists.map((art,index) => index <4 &&(<span onClick={()=>navigate(`/artist/${art.id}`)} key={art.id}>{art.name}</span>) )}</p>
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
        </div>
      </div>
      <div className="home_row">
        <div className="home_row_heading">
          <h1>ARTISTS</h1>
          <h2>SEE ALL</h2>
        </div>
        <div className="home_row_cards">

          {data && data.artists.items.map((artist, index) => index<5 &&(
            <div key={artist.id} className="home_row_card">
              <div onClick={()=>navigate(`/artist/${artist.id}`)}>
              <div className="home_row_card_img">
               {artist.images[0]?.url? <img src={artist && artist.images[0]?.url} alt="album" />: <div className="img_avatar"><PermIdentityIcon className="alt_avatar" sx={{ fontSize: 115 }} /></div>}
              </div>
              <div className="home_row_card_name">
                <h1>{artist.name}</h1>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home_row">
        <div className="home_row_heading">
          <h1>PLAYLISTS</h1>
          <p>SEE ALL</p>
        </div>
        <div className="home_row_cards">

          {data && data.playlists.items.map((playlist, index) => index<5 &&(
            <div key={playlist.id} className="home_row_card">
              <div onClick={()=>navigate(`/playlist/${playlist.id}`)}>
              <div className="home_row_card_img">
               {playlist.images[0]?.url? <img src={playlist && playlist.images[0]?.url} alt="album" />: <div className="img_avatar"><PermIdentityIcon className="alt_avatar" sx={{ fontSize: 115 }} /></div>}
              </div>
              <div className="home_row_card_name">
                <h1>{playlist.name}</h1>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>


     { data && data.episodes.items.length!==0 && <div className="home_row">
        <div className="home_row_heading">
          <h1>Episodes</h1>
          <p>SEE ALL</p>
        </div>
        <div className="home_row_cards">

          {data && data.episodes.items.map((episode, index) => index<5 &&(
            <div onClick={()=>navigate(`/episode/${episode.id}`)} key={episode.id} className="home_row_card">
              <div className="home_row_card_img">
               {episode.images[0]?.url? <img src={episode && episode.images[0]?.url} alt="album" />: <div className="img_avatar"><PermIdentityIcon className="alt_avatar" sx={{ fontSize: 115 }} /></div>}
              </div>
              <div className="home_row_card_name">
                <h1>{episode.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}

export default SearchResult;
