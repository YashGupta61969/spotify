import React from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";

function HomeRow({ featuredPl }) {
  return (
    <>
      {featuredPl &&
        featuredPl.map((playlist, index) => index < 5 && (
            <Link
              to={`playlist/${playlist.id}`}
              className="home_row_card"
              key={playlist.id}
            >
         <PlaylistCard  playlist={playlist}/>
            </Link>
          )
        )}
    </>
  );
}

export default HomeRow;
