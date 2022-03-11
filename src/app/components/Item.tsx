import React from "react";
import { Link } from "react-router-dom";
import { MovieDto } from "../models/movie";

interface Props {
  data: MovieDto;
  hideOverView?: boolean;
}
class Item extends React.Component<Props, {}> {
  render() {
    const data = this.props.data;
    const overview = !this.props.hideOverView && (
      <p className="card-text overview">{data.overview}</p>
    );
    return (
      <div className="item">
        <Link to={{ pathname: `/movie-detail/${data._id}` }}>
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
          {overview}
        </div>
      </div>
    );
  }
}

export default Item;
