import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
//import PropTypes from 'prop-types';

// AllArticle.propTypes = {

// };

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";

import axios from "../../shared/axios";
import urls from "../../shared/urls";

const useStyles = makeStyles(theme => ({
  textCapitalize: {
    textTransform: "capitalize"
  },
  marginTop: {
    marginTop: "20px"
  },
  marginLeft: {
    marginLeft: "20px"
  }
}));

function AllArticle(props) {
  const classes = useStyles();

  const [articles, setArticles] = useState(null);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let auth =
      JSON.parse(localStorage.getItem("auth")) ||
      JSON.parse(sessionStorage.getItem("auth"));
    console.log("auth", auth);
    setAuth(auth);
    axios
      .get(urls.article.getAuthorAll)
      .then(response => {
        console.log(response);
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        className={classNames(
          classes.textCapitalize,
          classes.marginTop,
          classes.marginLeft
        )}
      >
        Hello {auth.first_name}!!!{" "}
      </Typography>

      <br></br>

      <Grid container justify="center">
        {articles !== null ? (
          articles.length > 0 ? (
            articles.map((val, index) => {
              return (
                <Grid key={index} item xs={3} className="mr-4">
                  <Link to={`/article/${val.id}`}>
                    <Card className="card">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="120"
                          image={val.image.image_url}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {val.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {val.meta}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Read
                        </Button>
                        <Link key={index} to={`/article/edit/${val.id}`}>
                          <Button size="small" color="primary">
                            Edit
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Link>{" "}
                </Grid>
              );
            })
          ) : (
            <div> No articles found</div>
          )
        ) : (
          <div>Load</div>
        )}
      </Grid>
    </div>
  );
}

export default AllArticle;
