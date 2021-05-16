import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import axios from "../../shared/axios";
import urls from "../../shared/urls";
import { makeStyles } from "@material-ui/core/styles";
import "./Dashboard.css";

const useStyles = makeStyles(theme => ({
  title: {
    width: "60%"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState({});
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("");

  useEffect(() => {
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

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    setContent(content);
  };

  const onFileChange = event => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    console.log("file", event.target.files[0]);
  };

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = e => {
    setArticleCategory(e.target.value);
  };

  const submit = () => {
    if (title.length <= 0) {
      alert("enter the suitable title");
    } else if (articleCategory == null || "") {
      alert("select category for your article");
    } else {
      const uploadData = new FormData();
      uploadData.append("title", title);
      uploadData.append("content", content);
      uploadData.append("image", selectedFile, selectedFile.name);
      uploadData.append("category", articleCategory);
      console.log(title, " ", content, " ", articleCategory);
      console.log("data ", uploadData);

      axios
        .post(urls.article.add, uploadData, {
          headers: {
            "content-type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-m-12">
            <TextField
              inputProps={{ maxLength: 30 }}
              className={classes.title}
              id="title"
              label="TITLE OF THE ARTICLE"
              variant="outlined"
              onChange={handleTitle}
            />
          </div>
        </div>
        <br></br>

        <div className="row">
          <div className="col-md-2">
            <Typography>Choose Image</Typography>{" "}
          </div>
          <div className="col-md-1">
            <input type="file" onChange={onFileChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            {categories !== null && categories.length > 0 && (
              <FormControl>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleCategoryChange}
                  outlined
                  className="mt-4 mb-4"
                >
                  {categories.map((val, index) => {
                    return (
                      <MenuItem key={index} value={val.id}>
                        {val.category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </div>
        </div>

        <br></br>

        <div className="row">
          <div className="col-md-12">
            <Editor
              initialValue="<p>This is the initial content of the editor</p>"
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
          </div>
        </div>
        <br></br>
        <div className="row  ">
          <div className="col-md-12 d-flex justify-content-between">
            <Button onClick={submit} variant="contained" color="primary">
              SUBMIT
            </Button>

            <Link href="/allArticles" variant="body2">
              <Button variant="contained" color="primary">
                {" "}
                GO TO BLOGS{" "}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
    </div>
  );
}

export default Dashboard;
