import { useEffect} from 'react';
import './app.css'
import Login from './components/Login';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import getToken from './spotify';
import {BrowserRouter}from 'react-router-dom'
import { useDataLayerValue } from './DataLayer';

function App() {
  const [{token}, dispatch] = useDataLayerValue();

  useEffect(()=>{
    const _token = getToken().access_token;

    if (_token){
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })
    }

    window.location.hash = ""
  },[]);


  useEffect(()=>{
    token && fetch("https://api.spotify.com/v1/me",{
      method:'GET',
      headers: {
      "Authorization" : "Bearer " + token
      }
    }).then(response =>{
      return response.json();
    }).then(data =>{
      dispatch({
        type: 'SET_USER',
        user: data
      })
    })
  }, [token])
  
  return (
    <>
  <BrowserRouter>
      {
        token ?
        <div className="app">
        <Sidebar token={token}/>
        <Main/>
        {/* <Footer/> */}
       </div> : <Login/>}
     
       </BrowserRouter>
    </>
  );
}

export default App;

