import React from 'react'
import AlbumCard from './AlbumCard';

function AlbumRow({albums}) {
  return (
    <>
        {albums &&
        albums.map((album, index) => index < 5 && (
            <div
              className="home_row_card"
              key={album.id}
            >
         <AlbumCard album={album}/>
            </div>
          )
        )}
    </>
  )
}

export default AlbumRow
