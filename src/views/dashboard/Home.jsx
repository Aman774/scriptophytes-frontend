import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import axios from "../../shared/axios";
import urls from "../../shared/urls";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-bootstrap/Carousel";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import SimpleCard from "../../components/card/card";

import "./Home.css";
import logo from "../../assets/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Home(props) {
  const [articles, setArticles] = useState(null);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    axios
      .get(urls.article.getAll)
      .then(response => {
        console.log(response);
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(urls.category.getAll)
      .then(response => {
        console.log("categories", response.data);
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const classes = useStyles();
  return (
    <div>
      <br></br>
      <br></br>
      <div className="container-fluid">
        <div class="row">
          <div class="col-md-12 col-xm-12">
            <section class="feature">
              <div class="feature_container">
                <div class="feature_container-postimg">
                  <img
                    src="https://source.unsplash.com/1600x900/?nature,water"
                    alt=""
                  ></img>
                </div>
                <div class="feature_container-posttxt">
                  <div class="post">
                    <div class="post-featured">
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22.9712403,8.05987765 L16.2291373,8.05987765 L12.796794,0.459688839 C12.5516266,-0.153229613 11.4483734,-0.153229613 11.0806223,0.459688839 L7.64827899,8.05987765 L0.906176009,8.05987765 C0.538424938,8.05987765 0.170673866,8.30504503 0.0480901758,8.6727961 C-0.0744935148,9.04054717 0.0480901758,9.40829825 0.293257557,9.65346563 L5.31918887,14.3116459 L3.11268244,22.4021694 C2.99009875,22.7699205 3.11268244,23.1376716 3.48043351,23.382839 C3.72560089,23.6280063 4.21593565,23.6280063 4.46110303,23.5054227 L11.9387082,19.2149935 L19.4163133,23.5054227 C19.538897,23.6280063 19.6614807,23.6280063 19.906648,23.6280063 C20.1518154,23.6280063 20.2743991,23.5054227 20.5195665,23.382839 C20.7647339,23.1376716 20.8873176,22.7699205 20.8873176,22.4021694 L18.6808111,14.3116459 L23.7067424,9.65346563 C23.9519098,9.40829825 24.0744935,9.04054717 23.9519098,8.6727961 C23.7067424,8.30504503 23.3389914,8.05987765 22.9712403,8.05987765 Z"></path>
                      </svg>
                      Featured
                    </div>
                    <h2 class="post-heading">
                      <a href="#">
                        I Think it's the responsibilty of a designer to try to
                        break rules and barriers
                      </a>
                    </h2>
                    <div class="post-author">
                      by <a href=""> someone. </a> <br></br>{" "}
                      <span> 2months ago </span>
                    </div>
                  </div>
                </div>
                {/* <div class="feature_container-nextbtn">
                <span></span>
              </div> */}
              </div>
            </section>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 ">
            <Typography variant="h4" color="primary" className="ml-4">
              Latest Articles
            </Typography>
            <br></br>
          </div>
          {articles !== null ? (
            articles.length > 0 ? (
              articles.map((val, index) => {
                if (index < 3) {
                  return (
                    <div className="col-md-4">
                      <Link key={index} to={`/article/${val.id}`}>
                        <SimpleCard
                          image={val.image.image_url}
                          title={val.title}
                          author={val.author.author}
                          category={val.category.name}
                        ></SimpleCard>
                      </Link>
                    </div>
                  );
                }
              })
            ) : (
              <div> No articles found</div>
            )
          ) : (
            <div>Load</div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12">
            <section class="newsletter">
              <div class="newsletter-container">
                <h2>Join our occasional newsletter</h2>

                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  class="email"
                />
                <br></br>
                <input type="submit" value="Subscribe" class="submit" />
              </div>
            </section>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <footer class="footer">
              <img src={logo} alt="" />
              <p>
                {" "}
                &#169; 2020 <a href="index.html"> Scriptophytes.</a> All Rights
                Reserved
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
