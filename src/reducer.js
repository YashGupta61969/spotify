export const initialState = {
  user: null,
  transfer:null,
  myPlaylists: [],
  albumTracks: null,
  likedTracks:null,
  screenSize:null,
  toggleSidebar:false,
  album: null,
  playing: false,
  categoryId:"",
  item: null,
  playlist:null,
  playlistId: null,
  artistId:null,
  searchSong:null,
  toggle:false,
  albumId: null,
  searchInp:false,
  recent:null,
  newReleases:null,
  query: null,
  featuredPl: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_MYPLAYLISTS":
      return {
        ...state,
        myPlaylists: action.myPlaylists,
      };

    case "SET_LIKEDTRACKS":
      return {
        ...state,
        likedTracks: action.likedTracks,
      };

      case 'SET_ALBUMID':
        return{
          ...state,
          albumId: action.albumId
        }

        case 'SET_ARTISTID':
          return{
            ...state,
            artistId: action.artistId
          }

        case 'SET_EPISODEID':
          return{
            ...state,
            episodeId: action.episodeId
          }

        case 'SET_SHOWID':
          return{
            ...state,
            showId: action.showId
          }
        
        case 'RECENTLY_PLAYED':
          return{
            ...state,
            recent: action.recent
          }


        case 'SEARCH_DATA':
          return{
            ...state,
            searchSong: action.searchSong
          }

        case 'SCREEN_WIDTH':
          return{
            ...state,
            screenSize: action.screenSize
          }

        case 'TOGGLE_SIDEBAR':
          return{
            ...state,
            toggleSidebar: action.toggleSidebar
          }

    case "SET_PLAYLISTID":
      return {
        ...state,
        playlistId: action.playlistId,
      };

    case "SET_PLAYLIST":
      return {
        ...state,
        playlist: action.playlist,
      };

    case "SET_FEATURED_PLAYLISTS":
      return {
        ...state,
        featuredPl: action.featuredPl,
      };

    case "NEW_RELEASES":
      return {
        ...state,
        newReleases: action.newReleases,
      };

      case 'SET_ALBUM':
        return{
          ...state,
          album: action.album
        }

        case 'SET_ALBUMTRACKS':
          return{
            ...state,
            albumTracks: action.albumTracks
          }

          case 'TOGGLER':
            return{
              ...state,
              toggle: action.toggle,
              searchInp: action.searchInp
            }
          case 'SET_CATEGORYID':
            return{
              ...state,
              categoryId:action.categoryId
            }

            case 'QUERY':
              return{
                ...state,
                query: action.query
              }

    default:
      return state;
  }
};

export default reducer;
