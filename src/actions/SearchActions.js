import * as types from '../constants/SearchActionTypes';
import jobSearch from '../api/JobSearch';

function searchWithJobAPI(keyword, page, dispatch) {
  if (page >= 1) {
    dispatch({
      type: types.SEARCH_PENDING_FOR_NEXT,
    });
  }else {
    dispatch({
      type: types.SEARCH_PENDING,
    });
  }

  jobSearch(keyword, page, (data) => {
    dispatch({
      type: types.SEARCH_DONE,
      jobs: data,
      page,
      keyword,
    });
  });
}

export function searchNextPageAction() {
  return (dispatch, getState) =>{
    const page = getState().jobs.page + 1;
    const keyword = getState().jobs.keyword;
    searchWithJobAPI(keyword, page, dispatch);
  };
}

export function searchJobAction(keyword, page = 0) {
  return (dispatch) => {
    searchWithJobAPI(keyword, page, dispatch);
  };
}
