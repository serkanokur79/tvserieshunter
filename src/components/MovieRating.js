import React, { useEffect, useState } from "react";
import { Progress } from "antd";

function MovieRating(props) {
  const { vote_average, width, margin } = props;
  const [rating, setRating] = useState(0);
  const ratingFinal = vote_average * 10;

  useEffect(() => {
    if (rating < ratingFinal) {
      setRating(rating + 1);
    }
  }, [rating]);

  return (
    <Progress
      width={width}
      style={{
        backgroundColor: "#fff",
        borderRadius: `${width}`,
        rotate: "90",
        margin: `${margin}`,
      }}
      type='circle'
      strokeColor={{
        "0%": "red",
        "25%": "orange",
        "50%": "yellow",
        "100%": "darkgreen",
      }}
      percent={rating}
    />
  );
}

export default MovieRating;
