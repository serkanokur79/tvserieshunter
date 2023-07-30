import React, { useReducer } from "react";

import SerieContext from "./SerieContext";
import SerieReducer from "./SerieReducer";
import {
  SET_QUERY,
  SET_SEARCHEDQUERY,
  SET_SERIES,
  SET_LATESTSERIES,
  SET_SERIEVIDEOS,
  SET_SERIESTRAILERVIDEO,
  SET_MOSTRATEDSERIES,
  SET_SERIESTOTALRESULTS,
  SET_SERIESCURRENTPAGE,
  SET_SERIESTOTALPAGES,
  SET_SERIE,
  SET_SERIEERROR,
} from "../types";

const SerieState = (props) => {
  const initialState = {
    query: "",
    searchedQuery: "",
    series: [],
    serieVideos: [],
    seriesTrailerVideo: [],
    latestSeries: [],
    mostRatedSeries: [],
    seriesTotalResults: 1,
    seriesCurrentPage: 1,
    seriesTotalPages: 1,
    serie: {},
    favSeries: [],
    loading: false,
    serieError: true,
  };

  const [state, dispatch] = useReducer(SerieReducer, initialState);

  //Set Query
  const setQuery = (query) => {
    dispatch({ type: SET_QUERY, payload: query });
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };

  // Search series
  const searchSeries = async (query, pageNumber) => {
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US`;
    setLoading();
    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {
        setSearchQuery(query);
        setSeries(res.results);
        setSeriesTotalResults(res.total_results);
        setSeriesTotalPages(res.total_pages);
        setSeriesCurrentPage(res.page);
      })
      .catch((err) => console.error(err));
  };
  // get latest series
  const getLatestSeries = async (page) => {
    setLoading();
    fetch("https://api.themoviedb.org/3/discover/tv", options)
      .then((response) => response.json())
      .then((res) => {
        console.log("latest movies ==>", res);
        setlatestSeries(res.results);
        setSeriesTotalResults(res.total_results);
        setSeriesTotalPages(res.total_pages);
        setSeriesCurrentPage(res.page);
      })
      .catch((err) => console.error(err));
  };
  // gest most rated series

  const getMostRatedSeries = async (page) => {
    const url = `http://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&vote_count.gte=1000&language=en-US`;
    setLoading(true);

    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {
        console.log("latest movies ==>", res);
        setMostRatedSeries(res.results);
        setSeriesTotalResults(res.total_results);
        setSeriesTotalPages(res.total_pages);
        setSeriesCurrentPage(res.page);
      })
      .catch((err) => console.error(err));
  };
  //Set Searched Query
  const setSearchQuery = (query) => {
    dispatch({ type: SET_SEARCHEDQUERY, payload: query });
  };
  //Set series
  const setSeries = (series) => {
    dispatch({ type: SET_SERIES, payload: series });
  };
  //Set latest series
  const setlatestSeries = (series) => {
    dispatch({ type: SET_LATESTSERIES, payload: series });
    console.log("latest tv series", state.latestSeries);
  };
  //Set most rated series
  const setMostRatedSeries = (series) => {
    dispatch({ type: SET_MOSTRATEDSERIES, payload: series });
  };

  //Set total results
  const setSeriesTotalResults = (number) => {
    dispatch({ type: SET_SERIESTOTALRESULTS, payload: number });
  };

  // Set seriesC
  const setSeriesCurrentPage = (currentPage) => {
    dispatch({ type: SET_SERIESCURRENTPAGE, payload: currentPage });
  };

  //Set Total Pages
  const setSeriesTotalPages = (totalPages) => {
    dispatch({ type: SET_SERIESTOTALPAGES, payload: totalPages });
  };

  // Get serie
  const getSerie = async (tvId) => {
    const url = `https://api.themoviedb.org/3/tv/${tvId}&language=en-US`;
    setLoading(true);

    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {
        console.log("latest movies ==>", res);
        setSerie(res);
        setSerieError(false);
      })
      .catch((err) => {
        console.log("serie " + tvId + "not found!!!");
        setSerieError(true);
        setSerie([]);
      });

    console.log("serie " + tvId + " successfully loaded");
  };
  // Get serie videos
  const getSerieVideos = async (tvId) => {
    const url = `https://api.themoviedb.org/3/tv/${tvId}/videos`;
    setLoading(true);

    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {
        console.log("latest eries videos ==>", res);
        setSerieVideos(res.results);
        for (let i = 0; i < res.results.length; i++) {
          if (res.results[i].type === "Trailer") {
            const trailer = [res.results[i].name, res.results[i].key];

            setSeriesTrailerVideo(trailer);
          }
        }
      })
      .catch((err) => {
        console.log("serie " + tvId + "does not have videos");
        setSerieVideos([]);
      });
  };
  //set serie videos
  const setSerieVideos = (data) =>
    dispatch({ type: SET_SERIEVIDEOS, payload: data });

  //set Trailer video
  const setSeriesTrailerVideo = (data) =>
    dispatch({ type: SET_SERIESTRAILERVIDEO, payload: data });

  //Set movie data to
  const setSerie = (serie) => dispatch({ type: SET_SERIE, payload: serie });

  // setMovieError
  const setSerieError = (bool) =>
    dispatch({ type: SET_SERIEERROR, payload: bool });

  // Add movie to favMovies

  // remove movie from favMovies

  // SetLoading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <SerieContext.Provider
      value={{
        query: state.query,
        searchedQuery: state.searchedQuery,
        seriesCurrentPage: state.seriesCurrentPage,
        series: state.series,
        serieVideos: state.serieVideos,
        seriesTrailerVideo: state.seriesTrailerVideo,
        seriesTotalResults: state.seriesTotalResults,
        latestSeries: state.latestSeries,
        mostRatedSeries: state.mostRatedSeries,
        serie: state.serie,
        serieError: state.serieError,
        favSeries: state.favSeries,
        loading: state.loading,
        seriesTotalPages: state.seriesTotalPages,
        setQuery,
        setSearchQuery,
        searchSeries,
        setSeries,
        getSerie,
        setSerie,
        setLoading,
        setSeriesTotalResults,
        setSeriesCurrentPage,
        setSeriesTotalPages,
        getLatestSeries,
        getMostRatedSeries,
        getSerieVideos,
      }}
    >
      {props.children}
    </SerieContext.Provider>
  );
};

export default SerieState;
