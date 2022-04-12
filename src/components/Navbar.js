import React, {useEffect, useState} from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import "./navbar.css";
import { useDataLayerValue } from "../DataLayer";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';


function Navbar() {

  const [{ user, toggle, searchInp }, dispatch] = useDataLayerValue();
  const [input, setInput] = useState("");
  const [data, setdata] = useState("");
  const [showOptions, setshowOptions] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();


  window.addEventListener('resize',()=>{
    setScreenSize(window.innerWidth)
  })

  useEffect(()=>{
    dispatch({
      type:'SCREEN_WIDTH',
      screenSize: screenSize
    })
  },[screenSize])


  useEffect(()=>{
    dispatch({
      type:'TOGGLE_SIDEBAR',
      toggleSidebar: toggleSidebar
    })

  },[toggleSidebar])

  function prev(){
    navigate(-1)
  }
  function next(){
    navigate(1)
  }

  function changedData(e){
    setInput(e.target.value)
  }

  function formSubmit(e){
    e.preventDefault();
    setdata(input)
  }

  function showUserOptions(){
    setshowOptions(prev=>!prev)
  }

  useEffect(()=>{
    dispatch({
      type:'QUERY',
      query:data
    })
  },[data])


  return (
    <div className="navbar">
     { screenSize < 1000 && <div className="navbar_logo">
     {!toggleSidebar ? <MenuIcon className="ham_menu" sx={{ fontSize: 35 }} onClick={()=>setToggleSidebar(true)} />:  <CloseIcon className="ham_menu" sx={{ fontSize: 35 }} onClick={()=>setToggleSidebar(false)} />}
      <img src={require('./spotifyLogo.png')} alt="" />
      </div>}
      <div className="navbar_nav">
      { 
      screenSize > 1000 &&
      <>
       <button className="navbar_nav_icon" onClick={prev}>
          <ArrowBackIosIcon className="util" sx={{ fontSize: 25 }} />
        </button>
        <div className="navbar_nav_icon" onClick={next}>
          <ArrowForwardIosIcon sx={{ fontSize: 25 }} />
        </div>
        </>
        }

        {toggle && (
          <div className="navbar_library">
            <Link className="navbar_library_container" to={"library"}>
              Playlist
            </Link>
            <Link className="navbar_library_container" to={"library/albums"}>
              Albums
            </Link>
            <Link className="navbar_library_container" to={"library/artists"}>
              Artists
            </Link>
            <Link className="navbar_library_container" to={"library/podcasts"}>
              Podcasts
            </Link>
          </div>
        )}
      </div>

    { searchInp && <form onSubmit={formSubmit} className="search_bar">
      <button className="search_icon">
    <SearchIcon sx={{ fontSize: 29 }} />
      </button>
        <input type="text" onChange={changedData} value={input} placeholder="Artists, Tracks, Podcasts" />
      </form>}

      <div onClick={showUserOptions} className="navbar_user">
        <div className="navbar_avatar">
          <img src={user && user.images[0].url} alt="" />
        </div>
        <div className="navbar_username">
          <h2>{user?.display_name}</h2>
          <div className={`navbar_user_avatar ${showOptions && "reverse"}`}>

          <ArrowDropDownIcon sx={{ fontSize: 25 }} />
          </div>
        </div>
      <div className={showOptions?"user_options":"hide_user"}>
        <div className="user_option_row"><p>Account</p> </div>
        <div className="user_option_row"><p>Profile</p> </div>
        <div className="user_option_row"><p>Logn Out</p>  </div>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
