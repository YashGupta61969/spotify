import React,{useEffect, useState} from 'react'
import { useDataLayerValue } from '../../DataLayer';
import AlbumCard from './AlbumCard';

function AlbumRow({albums}) {
  const [{}, dispatch] = useDataLayerValue();

  const [localAlbum, setAlbum] = useState();
    useEffect(() => {
    dispatch({
      type: "SET_ALBUMID",
      albumId: localAlbum,
    });
  }, [localAlbum]);


  return (
    <>
        {albums &&
        albums.map((album, index) => index < 5 && (
            <div
              onMouseEnter={()=>setAlbum(album.id && album.id)}
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
