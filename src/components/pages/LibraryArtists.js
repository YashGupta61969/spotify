import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";

function LibraryArtists() {
  const [{ token }, dispatch] = useDataLayerValue();
  const [artists, setArtists] = useState("");
  const [artistId, setArtistId] = useState("");

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/following?type=artist", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => setArtists(data.artists.items));

  dispatch({
    type:'SET_ARTISTID',
    artistId:artistId
  })

      

  },[artistId]);
  return (
    <>
    <Outlet/>
        <div className="library_main">
      <div className="library_head">
        <h1>ARTISTS</h1>
      </div>
      <div className="library_container">
        {artists &&
          artists.map((artist) => {
            return (
              <Link to={`/artist/${artist.id}`} key={artist.id}>
              <div onMouseOver={()=>setArtistId(artist.id)} className="library_artist">
                <div className="library_artist_img">
                  <img src={artist.images[0].url} alt="" />
                </div>
                <div className="library_artist_name">
                  <h1>{artist.name}</h1>
                </div>
              </div>
              </Link>
            );
          })}
      </div>
    </div>
    </>
  );
}

export default LibraryArtists;
