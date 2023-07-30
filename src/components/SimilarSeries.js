import React, { useState, useEffect } from "react";
import SerieMiniCard from "./SerieMiniCard";
import { Row, Space, Col, Typography, Empty } from "antd";
const { Title } = Typography;

function SimilarSeries({ serieId }) {
  const [results, setResults] = useState([]);
  const [numResults, setNumResults] = useState(0);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };
  const searchSimilarSeries = async (serieId) => {
    const url = `https://api.themoviedb.org/3/tv/${serieId}/similar
`;

    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {
        setResults(res.results);
        setNumResults(res.total_results);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    searchSimilarSeries(serieId);
  }, [serieId]);

  return (
    <div className="tabSlider">
      {numResults > 0 && (
        <Row>
          <Space size="middle">
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
      {numResults === 0 && (
        <>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <Title level={4}>Not enough data about the TV Series!</Title>
        </>
      )}
    </div>
  );
}

export default SimilarSeries;
