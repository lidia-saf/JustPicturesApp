import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import AboutMe from "./AboutMe";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Just Pictures</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/aboutme">About Me</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/aboutme" component={AboutMe} />
          </div>
          <div className="footer">
            <p className="footerMessage">Made with ヽ(•‿•)ノ by Lidia</p>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;