import * as types from '../constants/SearchActionTypes';

const initialState = {
  status: 'IDLE',
  jobs: [],
};

export default function searchJobs(state = initialState, action) {
  switch (action.type) {
  case types.SEARCH_DONE:
    return {
      ...state,
      jobs: [...state.jobs, ...action.jobs],
      status: 'DONE',
      page: action.page,
      keyword: action.keyword,
    };
  case types.SEARCH_PENDING_FOR_NEXT:
    return {
      ...state,
      status: 'PENDING_FOR_NEXT',
    };
  case types.SEARCH_PENDING:
    return {
      ...state,
      jobs: [],
      status: 'PENDING',
    };
  default:
    return state;
  }
}
