
  const scopes = [
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-follow-read",
    "user-library-read",
    "app-remote-control",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "playlist-read-collaborative",
    "playlist-read-private"
  ]
  
  const redirectUri = "http://localhost:3000/"
  // const redirectUri = "https://spotify-clone-69.netlify.app/"

  export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_KEY}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

const getToken = ()=>{
    return window.location.hash.substring(1).split('&').reduce((init, item)=>{
        let parts = item.split('=');
        init[parts[0]] = decodeURIComponent(parts[1]);

        return init;
    },{})
}

export default getToken;