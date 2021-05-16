import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import SimpleCard from "../../components/card/card";

import axios from "../../shared/axios";
import urls from "../../shared/urls";

function CategoryArticle(props) {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    axios
      .get(urls.category.getParticularArticle(props.match.params.category_id))
      .then(response => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.category_id]);
  return (
    <div>
      <div className="container-fluid">
        <br></br>
        <div className="row">
          <div className="col-md-12 ">
            {articles !== null && articles.length > 0 && (
              <Typography className="ml-5" variant="h4">
                {" "}
                {articles[0].category.name}{" "}
              </Typography>
            )}
            <br></br>
          </div>
          {articles !== null ? (
            articles.length > 0 ? (
              articles.map((val, index) => {
                return (
                  <div className="col-md-4 mb-4">
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
              })
            ) : (
              <div> No articles found</div>
            )
          ) : (
            <div>Load</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryArticle;
