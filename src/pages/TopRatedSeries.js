import { useEffect, useContext, useState } from "react";
import SerieMiniCard from "../components/SerieMiniCard";
import { Row, Space, Col, Typography } from "antd";
import SerieContext from "../context/series/SerieContext";
const { Title } = Typography;

function TopRatedSeries({ serieId }) {
  const serieContext = useContext(SerieContext);
  const { getMostRatedSeries, mostRatedSeries } = serieContext;
  const [numResults, setNumResults] = useState(0);

  useEffect(() => {
    getMostRatedSeries();
  }, []);

  useEffect(() => {
    setNumResults(mostRatedSeries.length);
  }, [mostRatedSeries]);

  const [span, setSpan] = useState(6);

  useEffect(() => {
    setSpan(calculateSpan());
  }, [window.innerWidth]);

  const calculateSpan = () => {
    return window.innerWidth < 767
      ? 12
      : window.innerWidth < 991
      ? 8
      : window.innerWidth < 1280
      ? 6
      : 4;
  };

  return (
    <>
      {numResults > 0 && (
        <>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "90vh", width: "95vw" }}
          >
            <Col xs={20} offset={1}>
              <Row type="flex" justify="center" align="middle">
                <Title>Top Rated TV Series</Title>
              </Row>
              <Space>
                <Row gutter={[16, 16]}>
                  {mostRatedSeries
                    .slice(0, 12)
                    .filter((serie) => serie.poster_path)
                    .map((serie) => (
                      <Col span={span}>
                        <SerieMiniCard serie={serie} key={serie.id} />
                      </Col>
                    ))}
                </Row>
              </Space>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default TopRatedSeries;
