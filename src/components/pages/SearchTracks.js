import React from 'react'
import { useDataLayerValue } from '../../DataLayer'

function SearchTracks() {

    const[{searchSong}]= useDataLayerValue();

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
    <div className="search_result_tracks_column margin_left util2">
            {
              searchSong && searchSong.map((track) =>  (
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
  )
}

export default SearchTracks
