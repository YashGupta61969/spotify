import "./main.css";
import React from "react";
import LikedTracks from "./pages/LikedTracks";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useDataLayerValue } from "../DataLayer";
import PlaylistPage from "./pages/PlaylistPage";
import Navbar from "./Navbar";
import AlbumPage from "./pages/AlbumPage";
import LibraryPage from "./pages/LibraryPage";
import LibraryPlaylist from "./pages/LibraryPlaylist";
import LibraryPodcasts from "./pages/LibraryPodcasts";
import CategoryPage from "./pages/CategoryPage";
import LibraryAlbums from "./pages/LibraryAlbums";
import LibraryArtists from "./pages/LibraryArtists";
import ArtistPage from "./pages/ArtistPage";
import Search from "./pages/Search";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import TopPlayed from "./pages/TopPlayed";
import SeeAll from "./pages/SeeAll";
import NewReleases from './pages/NewReleases';
import SearchTracks from "./pages/SearchTracks";
import EpisodePage from "./pages/EpisodePage";
import Show from "./pages/Show";


function Main() {
  const [{ token }] = useDataLayerValue();

  return (
    <>
      <div className="main">
        <Navbar />
        <Routes>
          <Route
            path="/likedtracks"
            element={<LikedTracks token={token} />}
          />
          <Route
            path='search/category/:id'
            element={<CategoryPage token={token}/>}
          />

          <Route
            path="/recently-played"
            element={<RecentlyPlayed token={token} />}
          />

          <Route
            path='/top-played'
            element={<TopPlayed token={token} />}
          />

          <Route
            path='/recommended-playlists'
            element={<SeeAll token={token}/>}
          />

          <Route
            path='/new-releases'
            element={<NewReleases token={token}/>}
          />

          <Route
            path='/playlist/:id'
            element={<PlaylistPage token={token} />}
          />

          <Route
            path='/episode/:id'
            element={<EpisodePage token={token} />}
          />

          <Route
            path='/show/:id'
            element={<Show token={token} />}
          />

          <Route
            path={`search/search-results`}
            element={<SearchTracks token={token} />}
          />

          <Route
            path='album/:id'
            element={<AlbumPage token={token} />}
          />

          <Route
            path={`search`}
            element={<Search />}
          />
          <Route
          path='artist/:id'
          element={<ArtistPage token={token} />}
          />

          <Route index element={<Home />} />
          <Route path="library" element={<LibraryPage />}>
            <Route index element={<LibraryPlaylist token={token} />} />
            <Route path="albums" element={<LibraryAlbums token={token} />} />
            <Route path="artists" element={<LibraryArtists token={token} />} />

            <Route path="podcasts" element={<LibraryPodcasts />} />
          </Route>
        </Routes>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
