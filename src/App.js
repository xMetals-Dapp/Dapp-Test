import React from "react";
import Index from "pages/index";
import Index1 from "pages/index1";
import Index2 from "pages/index2";
import Index11 from "pages/index11";
import Index12 from "pages/index12";
import Index121 from "pages/index121";
import Index1211 from "pages/index1211";
import Index1212 from "pages/index1212";
import Index3 from "pages/index3";
import Signin from "pages/signin";
import Index12111 from "pages/index12111";
import Index121111 from "pages/index121111";
import Index1211111 from "pages/index1211111";
import Page404 from "pages/page404";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
   body {
       margin: 0;
       padding: 0;
       font-family: sans-serif;
   }
`;


export default () => (
   <Router>
       <GlobalStyles />
       <Switch>
                   <Route exact path='/' component={Index}/>
           <Route exact path='/index' component={Index}/>
           <Route exact path='/index1' component={Index1}/>
           <Route exact path='/index2' component={Index2}/>
           <Route exact path='/index11' component={Index11}/>
           <Route exact path='/index12' component={Index12}/>
           <Route exact path='/index121' component={Index121}/>
           <Route exact path='/index1211' component={Index1211}/>
           <Route exact path='/index1212' component={Index1212}/>
           <Route exact path='/index3' component={Index3}/>
           <Route exact path='/signin' component={Signin}/>
           <Route exact path='/index12111' component={Index12111}/>
           <Route exact path='/index121111' component={Index121111}/>
           <Route exact path='/index1211111' component={Index1211111}/>
           <Route component={Page404}/>
       </Switch>
   </Router>
);





