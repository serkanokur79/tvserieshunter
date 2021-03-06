import React, { useState, useEffect } from "react";
import SerieMiniCard from "./SerieMiniCard";
import { Row, Space, Col } from "antd";

function SimilarSeries({ serieId }) {
  const [results, setResults] = useState([]);
  const [numResults, setNumResults] = useState(0);

  const searchSimilarSeries = async (serieId) => {
    const url = `https://api.themoviedb.org/3/tv/${serieId}/similar?api_key=b8f6d41c97c40c0d5d8d498c90fdffc7&language=en-US&page=1
`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.results);
      setNumResults(data.total_results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchSimilarSeries(serieId);
  }, [serieId]);

  return (
    <div className='tabSlider'>
      {numResults > 0 && (
        <Row>
          <Space size='middle'>
            {results
              .slice(0, 6)
              .filter((serie) => serie.poster_path)
              .map((serie) => (
                <Col
                  style={{
                    backgroundColor: "white",

                    border: "2px darkgray solid",
                  }}
                >
                  <SerieMiniCard serie={serie} />
                </Col>
              ))}
          </Space>
        </Row>
      )}
    </div>
  );
}

export default SimilarSeries;
