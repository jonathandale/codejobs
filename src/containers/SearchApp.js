import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from '../actions/SearchActions';
import SearchInput from '../components/SearchInput';
import JobList from '../components/JobList';
import JobDetail from '../components/JobDetail';

@connect(state => ({
  jobs: state.jobs.jobs,
  job: state.jobs.job,
  status: state.jobs.status,
}))
export default class SearchApp extends Component {

  static propTypes = {
    status: PropTypes.string.isRequired,
    jobs: PropTypes.array,
    job: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const actions = bindActionCreators(action, this.props.dispatch);
    return (
      <div className="wrap flex flex-column flex-stretch">
        <div className="border-bottom p1 border-bottom">
          <SearchInput actions={actions} status={this.props.status} />
        </div>
        <div className="flex flex-auto">
          <div className="flex-first col col-6 overflow-y-scroll border-right">
            <JobList actions={actions} jobs={this.props.jobs} job={this.props.job} status={this.props.status}/>
          </div>
          <div className="flex-last col col-6 overflow-y-scroll">
            <JobDetail actions={actions} job={this.props.job} />
          </div>
        </div>
      </div>
    );
  }
}
