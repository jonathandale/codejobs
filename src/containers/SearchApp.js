import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from '../actions/SearchActions';
import SearchInput from '../components/SearchInput';
import JobList from '../components/JobList';
import JobDetail from '../components/JobDetail';
import classnames from 'classnames';

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

    var headerClass = classnames('bg-blue', this.props.className, {
      'flex flex-auto flex-center': this.props.status === 'IDLE'
    });

    return (
      <div className="wrap flex flex-column flex-stretch">
        <div className={headerClass}>
          <SearchInput actions={actions} status={this.props.status} />
        </div>
        {()=>{
          if (this.props.status === 'DONE') {
            return (
              <div className="bg-silver">
                <div className="bg-lighten-4 py1 px2">
                  <p className="p0 m0">Showing {this.props.jobs.length} jobs</p>
                </div>
              </div>
            );
          }
        }()}
        {()=>{
          if (this.props.status !== 'IDLE') {
            return (
              <div className="flex flex-auto">
                <div className="flex-first col col-6 overflow-y-scroll">
                  <JobList actions={actions} jobs={this.props.jobs} job={this.props.job} status={this.props.status}/>
                </div>
                <div className="flex-last col col-6 overflow-y-scroll border-left">
                  <JobDetail actions={actions} job={this.props.job} />
                </div>
              </div>
            );
          }
        }()}
      </div>
    );
  }
}
