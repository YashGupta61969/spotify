import React, { useEffect, useState } from "react";
import "./search.css";
import { useDataLayerValue } from "../../DataLayer";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

function Search() {
  const [{ token, query }, dispatch] = useDataLayerValue();

  const navigate = useNavigate();
  const [artist, setArtist] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
      query && fetch(`https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist%2Cplaylist%2Cepisode`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then(resp=>{
          return resp.json()
        }).then(data=>{
          dispatch({
            type:'SEARCH_DATA',
            searchSong: data.tracks.items
          })
          setSearchData(data)})


        fetch("https://api.spotify.com/v1/me/top/artists", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => setArtist(data.items));
          

        fetch("https://api.spotify.com/v1/browse/categories?country=IN&limit=50", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((categories) => setCategory(categories.categories.items));
        

    dispatch({
      type: "TOGGLER",
      searchInp: true,
    });

    return () => {
      dispatch({
        type: "TOGGLER",
        searchInp: false,
      });
    };
  }, [query]);

  return (
    <div className="search_page">
     {query.length===0 ?(<>
        <div className="search_top_artists">
        <h1 className="text_big">Your Top Artists</h1>
        <div className="search_top_row">
          {artist &&
            artist.map((art) => {
              return (
                <div onClick={()=>navigate(`/artist/${art.id}`)} key={art.id} className="search_top_card">
                <h1>{art.name}</h1>
                  <img src={art.images[0].url} alt="" />
                </div>
              );
            })}
        </div>
      </div>
      <div className="search_categories">
        <h1>Categories</h1>
        <div className="categories">
        {
          category && category.map(cat=>(
            <div onClick={()=>navigate(`category/${cat.id}`)} key={cat.id} >
            <div className="category_box">
              <img src={cat.icons[0].url} alt="" />
              <h2>{cat.name}</h2>
            </div>
            </div>
          ))
        }
        </div>

       
      </div>
      </>):<SearchResult data={searchData} query={query}/>}

    
    </div>
  );
}

export default Search;

      