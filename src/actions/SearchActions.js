import * as types from '../constants/SearchActionTypes';
import jobSearch from '../api/JobSearch';

function searchWithJobAPI(keyword, location, dispatch) {
  dispatch({
    type: types.SEARCH_PENDING,
  });

  jobSearch(keyword, location, (data) => {
    dispatch({
      type: types.SEARCH_DONE,
      jobs: data,
      keyword,
      location,
    });
  });
}

export function searchJobAction(keyword = "", location = "") {
  return (dispatch) => {
    searchWithJobAPI(keyword, location, dispatch);
  };
}

export function viewJob(index){
  return (dispatch) => {
    dispatch({
      type: types.VIEW_JOB,
      index: index
    });
  }
}
