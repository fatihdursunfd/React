import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Settings from "./pages/settings/Setttings"
import Write from "./pages/write/Write"
import Single from "./pages/single/Single"
import { useContext } from "react";
import { Context } from "./context/Context";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">{user ? <Home /> : <Register />}</Route>
        <Route exact path="/login">{user ? <Home /> : <Login />}</Route>
        { //<Route path="/write">{user ? <Write /> : <Register />}</Route> 
        }
        <Route exact path="/write"> <Write /> </Route>
        <Route exact path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route exact path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
