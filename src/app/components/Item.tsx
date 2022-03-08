import React, { useState } from "react";
import { Link } from "react-router-dom";

//@ts-ignore
const Item = ({ data, itemKey }) => {  
  return (
    <div className="col mt-5" key={itemKey}>
      <div className="card p-2">
        <Link to={{ pathname: `/phone-detail/${data.id}` }}>
          <img src={"https://picsum.photos/300/200?random=" + data.metaScore} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h4>{data.name}</h4>
          <h6>{data.genre}</h6>
          <h6>{data.imdbRating} / {data.runtime}</h6>
          <p
            className="card-text"
            style={{ fontSize: "12px", marginBottom: "3rem" }}
          >
            {data.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
