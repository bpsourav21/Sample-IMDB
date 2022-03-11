import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MovieDto } from "../models/movie";

interface Props {
  itemKey: string;
  data: MovieDto;
}
class Item extends React.Component<Props, {}> {
  render() {
    const data = this.props.data;
    return (
      <div className="col mt-5 data" key={this.props.itemKey}>
        <div className="card p-2">
          <Link to={{ pathname: `/phone-detail/${data._id}` }}>
            <img
              src={"https://picsum.photos/300/200?random=" + data.metaScore}
              className="card-img-top"
              alt="..."
            />
          </Link>
          <div className="card-body">
            <h4>{data.name}</h4>
            <h6>{data.genre}</h6>
            <h6>
              {data.imdbRating} / {data.runtime}
            </h6>
            <p
              className="card-text overview"
            >
              {data.overview}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
