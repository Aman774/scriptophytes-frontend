import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Views
import Login from "./views/authentication/Login";
import SignUp from "./views/authentication/SignUp";

import Dashboard from "./views/dashboard/Dashboard";
import AllArticles from "./views/dashboard/AllArticle";
import EditArticle from "./views/dashboard/EditArticle";

import Article from "./views/dashboard/Article";

import Home from "./views/dashboard/Home";

import { getAuthInfo } from "./shared/helpers";

import Toolbar from "./shared/Nav";

import CategoryArticle from "./views/dashboard/CategoryArticle";

import Publisher from "./views/dashboard/Publisher";

import UnpublishedArticle from "./views/dashboard/UnpublishedArticle"

export default function App() {
  return (
    <Router>
      <Toolbar> </Toolbar>
      <Switch>
        <Route
          path="/login/"
          exact
          render={props => {
            return <Login {...props} />;
          }}
        />
        <Route
          path="/dashboard/"
          exact
          render={props => {
            if (getAuthInfo() !== null) {
              return <Dashboard {...props} />;
            } else {
              return <Redirect to="/login/" />;
            }
          }}
        />{" "}
        <Route
          path="/signUp/"
          exact
          render={props => {
            return <SignUp {...props} />;
          }}
        />{" "}
        <Route
          path="/allArticles/"
          exact
          render={props => {
            return <AllArticles {...props} />;
          }}
        />
        <Route
          path="/article/:article_id"
          exact
          render={props => {
            return <Article {...props} />;
          }}
        />
        <Route
          path="/article/edit/:article_id"
          exact
          render={props => {
            return <EditArticle {...props} />;
          }}
        />
        <Route
          path="/home"
          exact
          render={props => {
            return <Home {...props} />;
          }}
        />
        <Route
          path="/categoryArticle/:category_id"
          exact
          render={props => {
            return <CategoryArticle {...props} />;
          }}
        />
        <Route
          path="/editor/article/publish/"
          exact
          render={props => {
            return <Publisher {...props} />;
          }}
        />
        <Route
          path="/unpublished/article/:article_id/"
          exact
          render={props => {
            return <UnpublishedArticle {...props} />;
          }}
        />
        {/* <Route
                path="/"
                exact
                render={props => {
                  if (getAuthInfo()) {
                    return <Redirect to="/dashboard/library" />
                  } else {
                    return <Redirect to="/login/" />
                  }
                }}
              /> */}
      </Switch>{" "}
    </Router>
  );
}
