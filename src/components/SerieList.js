import React, { useEffect, useContext, useState } from "react";
import PaginationA from "./PaginationA";
import SerieMiniCard from "./SerieMiniCard";
import { Row, Col } from "antd";
import SerieContext from "../context/series/SerieContext";

const SerieList = (props) => {
  const serieContext = useContext(SerieContext);
  const {
    series,
    searchSeries,
    seriesCurrentPage,
    searchedQuery,
    seriesTotalPages,
    setSeriesCurrentPage,
    seriesTotalResults,
  } = serieContext;

  useEffect(() => {
    searchSeries(searchedQuery, seriesCurrentPage);
  }, [searchedQuery, seriesCurrentPage]);

  //console.log("totalPages" + seriesTotalPages);
  //console.log("currentPage:" + seriesCurrentPage);

  const Paginator = () => (
    <PaginationA
      totalPages={seriesTotalPages}
      currentPage={seriesCurrentPage}
      setCurrentPage={setSeriesCurrentPage}
      totalResults={seriesTotalResults}
      searchedQuery={searchedQuery}
      type={decidePaginationType()}
    />
  );

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

  const decidePaginationType = () => {
    return window.innerWidth < 767 ? "simple" : "full";
  };

  return (
    <>
      {searchedQuery && (
        <>
          <Paginator />
          <Row gutter={[16, 16]}>
            {series &&
              series?.map((serie) => (
                <Col span={span}>
                  <SerieMiniCard serie={serie} key={serie.id} />
                </Col>
              ))}
          </Row>
          <Paginator />
        </>
      )}

      {searchedQuery && seriesTotalResults === 0 && (
        <h1>No results found for '{searchedQuery}'</h1>
      )}

      {!searchedQuery && <h1>Use search bar to make a search</h1>}
    </>
  );
};

export default SerieList;
