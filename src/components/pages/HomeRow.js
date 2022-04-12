import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";
import PlaylistCard from "./PlaylistCard";

function HomeRow({ featuredPl }) {
  const [{}, dispatch] = useDataLayerValue();

  const [local, setLocal] = useState();

  useEffect(() => {
    dispatch({
      type: "SET_PLAYLISTID",
      playlistId: local,
    });
  }, [local]);

  return (
    <>
      {featuredPl &&
        featuredPl.map((playlist, index) => index < 5 && (
            <div
              onMouseOver={()=>setLocal(playlist.id && playlist.id)}
              className="home_row_card"
              key={playlist.id}
            >
         <PlaylistCard local={local} playlist={playlist}/>
            </div>
          )
        )}
    </>
  );
}

export default HomeRow;
