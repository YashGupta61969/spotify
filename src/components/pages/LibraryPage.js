import React, { useEffect } from "react";
import { useDataLayerValue } from "../../DataLayer";
import "./libraryPage.css";
import { Outlet} from "react-router-dom";

function LibraryPage() {
  const [{}, dispatch] = useDataLayerValue();
 
  useEffect(() => {
    dispatch({
      type: "TOGGLER",
      toggle: true,
    });

    return () => {
      dispatch({
        type: "TOGGLER",
        toggle: false,
      });
    };
  }, []);

  return (
    <div className="library_page">
      <Outlet />
    
    </div>
  );
}

export default LibraryPage;
