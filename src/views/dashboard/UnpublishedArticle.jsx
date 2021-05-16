import React, { useEffect, useState } from "react";

import axios from "../../shared/axios";
import urls from "../../shared/urls";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import { Editor } from '@tinymce/tinymce-react';

function UnpublishedArticle(props) {
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState("");

  const [commentList, setCommentList] = useState(null);

  useEffect(() => {
    axios
      .get(urls.article.getUnpublishedParticular(props.match.params.article_id))
      .then(response => {
        console.log(response);
        setArticle(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.article_id]);

  useEffect(() => {
    axios
      .get(urls.comment.getComments(props.match.params.article_id))
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const postComment = () => {
    axios
      .post(urls.comment.addComment, {
        comment: comment,
        article_id: props.match.params.article_id
      })
      .then(response => {
        console.log("comment on article", response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleComment = e => {
    setComment(e.target.value);
  };

  const handleLike = () => {
    axios
      .post(urls.like.addLike, {
        article_id: props.match.params.article_id
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      Particular Article
      {article !== null ? (
        Object.keys(article).length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
            <div className="col-lg-12">
              comment
              <form noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={handleComment}
                />
                <Button
                  onClick={postComment}
                  variant="contained"
                  color="primary"
                >
                  send
                </Button>
              </form>
            </div>
            <div className="col-lg-12">
              <ThumbUpAltIcon onClick={handleLike}></ThumbUpAltIcon>
            </div>
          </div>
        ) : (
          <div> Article does not exists</div>
        )
      ) : (
        <div>Load</div>
      )}
    </div>
  );
}

export default UnpublishedArticle;
