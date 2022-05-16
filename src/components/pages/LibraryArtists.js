import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LibraryArtists({token}) {
  const [artists, setArtists] = useState("");

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

  },[]);
  return (
    <>
        <div className="see_all" style={{paddingBottom:'8rem'}}>
      <div className="home_row_heading" style={{marginBottom:'4rem'}}>
        <h1>ARTISTS</h1>
      </div>
      <div className="see_all_div">
        {artists &&
          artists.map((artist) => {
            return (
              <Link className="home_row_card" style={{marginTop:'2rem'}} to={`/artist/${artist.id}`} key={artist.id}>
                <div className="home_row_card_img">
                  <img src={artist.images[0].url} alt="" />
                </div>
                <div className="home_row_card_name">
                  <h1>{artist.name}</h1>
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
