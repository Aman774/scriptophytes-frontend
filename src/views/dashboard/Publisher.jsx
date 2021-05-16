import React, { useEffect, useState } from "react";
import "./Publisher.css";
import axios from "../../shared/axios";
import urls from "../../shared/urls";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

function Publisher(props) {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    axios
      .get(urls.article.getUnpublishedArticles)
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
      <h1>Publisher section</h1>
      <br></br>
      <table id="t01">
        <tr>
          <th>Article Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>View</th>
          <th>Publish</th>
          {/* <th>Age</th> */}
        </tr>
        {articles !== null ? (
          articles.length > 0 ? (
            articles.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{val.title}</td>
                  <td>{val.author.author}</td>
                  <td>{val.category.name}</td>
                  <td>
                    <Link to={`/article/${val.id}`}>
                      <Button variant="contained" color="primary">
                        View Article
                      </Button>{" "}
                    </Link>
                  </td>
                  <td>
                    <Button variant="contained" color="primary">
                      Publish
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>Articles not found </div>
          )
        ) : (
          <div>Loading... </div>
        )}
      </table>
    </div>
  );
}

export default Publisher;
