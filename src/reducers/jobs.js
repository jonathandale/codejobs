import * as types from '../constants/SearchActionTypes';

const initialState = {
  status: 'IDLE',
  jobs: [],
  job: null,
  index: 0
};

export default function searchJobs(state = initialState, action) {
  switch (action.type) {
  case types.SEARCH_DONE:
    return {
      ...state,
      jobs: [...state.jobs, ...action.jobs],
      status: 'DONE',
      keyword: action.keyword,
      location: action.location,
    };
  case types.VIEW_JOB:
    return {
      ...state,
      job: state.jobs[action.index],
      index: action.index
    };
  case types.SEARCH_PENDING:
    return {
      ...state,
      jobs: [],
      job: null,
      status: 'PENDING',
    };
  default:
    return state;
  }
}
