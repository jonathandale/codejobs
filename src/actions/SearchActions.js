import * as types from '../constants/SearchActionTypes';
import jobSearch from '../api/JobSearch';

function searchWithJobAPI(keyword, location, page, dispatch) {
  if (page >= 1) {
    dispatch({
      type: types.SEARCH_PENDING_FOR_NEXT,
    });
  }else {
    dispatch({
      type: types.SEARCH_PENDING,
    });
  }

  jobSearch(keyword, location, page, (data) => {
    dispatch({
      type: types.SEARCH_DONE,
      jobs: data,
      page,
      keyword,
      location,
    });
  });
}

export function searchNextPageAction() {
  return (dispatch, getState) =>{
    const page = getState().jobs.page + 1;
    const keyword = getState().jobs.keyword;
    const location = getState().jobs.location;
    searchWithJobAPI(keyword, location, page, dispatch);
  };
}

export function searchJobAction(keyword = "", location = "", page = 0) {
  return (dispatch) => {
    searchWithJobAPI(keyword, location, page, dispatch);
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
