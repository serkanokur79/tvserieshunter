import { useContext } from "react";
import SerieList from "../components/SerieList";
import SerieContext from "../context/series/SerieContext";
import { useLocation } from "react-router";
import { Col } from "antd";

export default function SearchResults(props) {
  const serieContext = useContext(SerieContext);
  const { searchedQuery, setSearchQuery } = serieContext;
  const location = useLocation();
  const searchKey = location.search.substring(1);
  //console.log(searchKey);

  return (
    <>
      <Col xs={22} offset={1}>
        {searchedQuery && <SerieList />}
        {!searchedQuery && searchKey && setSearchQuery(searchKey)}
      </Col>
    </>
  );
}
