import React, { Component } from "react";

import "./footer.css";

class Footer extends Component
{
   constructor(props)
   {
      super(props);
   }

   render()
   {
      return <div className="footer grey darken-4 grey-text lighten-4-text">
         <div className="row">
            <div className="col s12 m6">
               This site was development by <a href="https://github.com/joaquinrmi" target="_blank">joaquinrmi</a> using the MERN Stack. You can found the repository in the next link: <a href="http://github.com/joaquinrmi/blog-sample" target="_blank">blog-sample</a>.
            </div>

            <div className="col s12 m6">
               Iconos diseñados por <a href="https://www.flaticon.es/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon"> www.flaticon.es</a>
            </div>
         </div>
      </div>
   }
}

export default Footer;