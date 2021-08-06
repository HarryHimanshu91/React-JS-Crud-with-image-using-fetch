import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Image from "./components/Image";
import AddImage from "./components/AddImage";
import EditImage from "./components/EditImage";

function App() {
  return (
    <Router>
      <Switch>
     
        <Route exact path="/" component={Image} />
        <Route path="/add-image" component={AddImage} />
        <Route path="/edit-image/:id" component={EditImage} />
     
       

      </Switch>
    </Router>
  );
}

export default App;
