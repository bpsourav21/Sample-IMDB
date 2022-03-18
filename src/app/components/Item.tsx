import React from "react";
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

    const ratingBlock = data.rating && data.totalUser && (
      <p>
        <b>{data.rating}</b> based on <b>{data.totalUser}</b> user ratings
      </p>
    );
    return (
      <div className="item">
        <img src={data.imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h4>
            {data.movieTitle} <span>({data.releaseDate})</span>
          </h4>
          <p>
            <b>Director</b>: {data.director}
          </p>
          <p>
            <b>Cast</b>: {data.cast}
          </p>
          {ratingBlock}
          {overview}
        </div>
      </div>
    );
  }
}

export default Item;
