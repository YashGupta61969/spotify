import React from "react";
import { useNavigate } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";

function HomeRow({ featuredPl }) {
  const navigate = useNavigate();
  return (
    <>
      {featuredPl &&
        featuredPl.map((playlist, index) => index < 5 && (
            <div
              onClick={()=>navigate(`playlist/${playlist.id}`)}
              className="home_row_card"
              key={playlist.id}
            >
         <PlaylistCard  playlist={playlist}/>
            </div>
          )
        )}
    </>
  );
}

export default HomeRow;
