import { useEffect, useContext, useState } from "react";
import SerieMiniCard from "../components/SerieMiniCard";
import { Row, Space, Col, Typography } from "antd";
import SerieContext from "../context/series/SerieContext";
const { Title } = Typography;

function LatestSeries({ serieId }) {
  const serieContext = useContext(SerieContext);
  const { getLatestSeries, latestSeries } = serieContext;
  const [numResults, setNumResults] = useState(0);

  useEffect(() => {
    getLatestSeries();
  }, []);

  useEffect(() => {
    setNumResults(latestSeries.length);
  }, [latestSeries]);

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
          <Row justify='center'>
            <Title>Latest TV Series</Title>
          </Row>
          <Space>
            <Row gutter={[16, 16]}>
              {latestSeries
                .slice(0, 12)
                .filter((serie) => serie.poster_path)
                .map((serie) => (
                  <Col span={span}>
                    <SerieMiniCard serie={serie} key={serie.id} />
                  </Col>
                ))}
            </Row>
          </Space>
        </>
      )}
    </>
  );
}

export default LatestSeries;
