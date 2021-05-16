import React from "react";
import "./card.css";
function card(props) {
  return (
    <div>
      <div class="card">
        <div class="card-img">
          <img src={props.image} alt=""></img>
        </div>
        <div class="card-text">
          <h2 class="card-heading">
            <a href="#">{props.title}</a>
          </h2>
          <p class="card-author">
            by <a href="#">{props.author}</a> <br></br> 2months ago
          </p>
          <div class="card-category">
            <a href="#">{props.category}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default card;
