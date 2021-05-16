import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import axios from "../../shared/axios";
import urls from "../../shared/urls";

function EditArticle(props) {
  const [content, setContent] = useState("");
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    setContent(content);
  };

  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(urls.article.getParticular(props.match.params.article_id))
      .then(response => {
        console.log("article", response);
        setArticle(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.article_id]);

  const submit = () => {
    axios
      .put(urls.article.update(props.match.params.article_id), {
        content: content,
        title: "test article2"
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      {article !== null ? (
        Object.keys(article).length > 0 ? (
          <Editor
            initialValue={article.content}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount"
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help"
            }}
            onEditorChange={handleEditorChange}
          />
        ) : (
          <div>Article does not exits </div>
        )
      ) : (
        <div>Load</div>
      )}

      <br></br>
      <br></br>

      <Grid container>
        <Grid item xs={3}>
          <Button onClick={submit} variant="contained" color="primary">
            UPDATE
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Link href="/allArticles" variant="body2">
            <Button variant="contained" color="primary">
              {" "}
              GO TO BLOGS{" "}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditArticle;
