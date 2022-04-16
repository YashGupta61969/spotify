import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <div className="see_all" style={{paddingBottom:'8rem'}}>
      <div className="home_row_heading" style={{marginBottom:'4rem'}}>
        <h1>ARTISTS</h1>
      </div>
      <div className="see_all_div">
        {artists &&
          artists.map((artist) => {
            return (
              <Link onMouseOver={()=>setArtistId(artist.id)} className="home_row_card" style={{marginTop:'2rem'}} to={`/artist/${artist.id}`} key={artist.id}>
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
