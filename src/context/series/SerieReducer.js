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
  SET_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case SET_SEARCHEDQUERY:
      return { ...state, searchedQuery: action.payload };
    case SET_SERIES:
      return { ...state, series: action.payload, loading: false };
    case SET_SERIEVIDEOS:
      return { ...state, serieVideos: action.payload };
    case SET_SERIESTRAILERVIDEO:
      return { ...state, seriesTrailerVideo: action.payload };
    case SET_SERIESTOTALRESULTS:
      return { ...state, seriesTotalResults: action.payload };
    case SET_SERIESCURRENTPAGE:
      return { ...state, seriesCurrentPage: action.payload };
    case SET_SERIESTOTALPAGES:
      return { ...state, seriesTotalPages: action.payload };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_LATESTSERIES:
      return { ...state, latestSeries: action.payload, loading: false };
    case SET_MOSTRATEDSERIES:
      return { ...state, mostRatedSeries: action.payload, loading: false };
    case SET_SERIE:
      return { ...state, serie: action.payload, loading: false };
    case SET_SERIEERROR:
      return { ...state, serieError: action.payload, loading: false };
    default:
      return state;
  }
};
