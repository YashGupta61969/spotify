export const initialState = {
  user: null,
  transfer:null,
  screenSize:null,
  toggleSidebar:false,
  item: null,
  searchSong:null,
  toggle:false,
  searchInp:false,
  query: null,
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

          case 'TOGGLER':
            return{
              ...state,
              toggle: action.toggle,
              searchInp: action.searchInp
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
