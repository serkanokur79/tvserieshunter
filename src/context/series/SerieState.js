import React, { useReducer } from "react";
import axios from "axios";
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

  // Search series
  const searchSeries = async (query, pageNumber) => {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=b8f6d41c97c40c0d5d8d498c90fdffc7&language=en-US&query=${query}&page=${pageNumber}&include_adult=false&sort_by=rating.desc`;
    setLoading();
    const res = await axios.get(url);
    setSearchQuery(query);
    setSeries(res.data.results);
    setSeriesTotalResults(res.data.total_results);
    setSeriesTotalPages(res.data.total_pages);
    setSeriesCurrentPage(res.data.page);
  };
  // get latest series
  const getLatestSeries = async (page) => {
    const url = `https://api.themoviedb.org/3/discover/tv?primary_release_date.gte=2021-02-15&primary_release_date.lte=2021-03-10&language=en-US&adult=false&sort_by=popularity.desc&page=${page}&api_key=b8f6d41c97c40c0d5d8d498c90fdffc7`;
    setLoading();
    const res = await axios.get(url);
    setlatestSeries(res.data.results);
    setSeriesTotalResults(res.data.total_results);
    setSeriesTotalPages(res.data.total_pages);
    setSeriesCurrentPage(res.data.page);
  };
  // gest most rated series

  const getMostRatedSeries = async (page) => {
    const url = `http://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&vote_count.gte=1000&api_key=b8f6d41c97c40c0d5d8d498c90fdffc7&language=en-US&page=${page}`;
    setLoading(true);
    const res = await axios.get(url);
    setMostRatedSeries(res.data.results);
    setSeriesTotalResults(res.data.total_results);
    setSeriesTotalPages(res.data.total_pages);
    setSeriesCurrentPage(res.data.page);
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
    const url = `https://api.themoviedb.org/3/tv/${tvId}?api_key=b8f6d41c97c40c0d5d8d498c90fdffc7`;
    setLoading(true);
    try {
      const res = await axios.get(url);
      console.log("serie " + tvId + " successfully loaded");
      setSerie(res.data);
      setSerieError(false);
    } catch (error) {
      console.log("serie " + tvId + "not found!!!");
      setSerieError(true);
      setSerie([]);
    }
  };
  // Get serie videos
  const getSerieVideos = async (tvId) => {
    const url = `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=b8f6d41c97c40c0d5d8d498c90fdffc7&language=en-US`;
    setLoading(true);
    try {
      const res = await axios.get(url);
      setSerieVideos(res.data.results);

      for (let i = 0; i < res.data.results.length; i++) {
        if (res.data.results[i].type === "Trailer") {
          /*console.log(
            res.data.results[0].type + " found: " + res.data.results[i].name
          );*/
          const trailer = [res.data.results[i].name, res.data.results[i].key];
          // console.log("trailer =>", trailer);
          setSeriesTrailerVideo(trailer);
        }
      }
    } catch (error) {
      console.log("serie " + tvId + "does not have videos");
      setSerieVideos([]);
    }
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
