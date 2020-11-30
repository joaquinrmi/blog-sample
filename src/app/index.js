import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import App from "./app";

function MainApp()
{
   useLocation();
   return <App />;
}

render(<Router><MainApp /></Router>, document.getElementById("app"));