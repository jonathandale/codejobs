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
      <div>
        <div className="header">
          <div>
            <SearchInput actions={actions} status={this.props.status} />
          </div>
        </div>
        <div className="jobList">
          <JobList actions={actions} jobs={this.props.jobs} status={this.props.status}/>
        </div>
        <div className="jobDetail">
          <JobDetail actions={actions} job={this.props.job} />
        </div>
      </div>
    );
  }
}
