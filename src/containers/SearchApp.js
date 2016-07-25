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
  index: state.jobs.index,
  status: state.jobs.status,
}))
export default class SearchApp extends Component {

  static propTypes = {
    status: PropTypes.string.isRequired,
    jobs: PropTypes.array,
    job: PropTypes.object,
    index: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    let getJobs = action.searchJobAction();
    this.props.dispatch(getJobs);
  }

  render() {
    const actions = bindActionCreators(action, this.props.dispatch);

    return (
      <div>
        <div className="spine fixed top-0 bottom-0 left-0 bg-blue">
          <p className="spine-title white h2 monospace">code@Jobs:~$</p>
          <p style={{letterSpacing: '2px'}}
             className="white center h3 monospace bold absolute bottom-0 left-0 right-0">&lt;&#47;&gt;</p>
        </div>
        <div className="wrap flex flex-column ml4">
          <div className="control-bar border-bottom">
            <div className="col col-5 border-top border-white">
              {()=>{
                return (
                  <div className="border-top border-white">
                    <div className="py1 px2 center">
                      <p className="p0 m0 line-height-4">All jobs &#40;{this.props.jobs.length}&#41;</p>
                    </div>
                  </div>
                );
              }()}
            </div>
            <div className="col col-7">
              <SearchInput actions={actions} status={this.props.status} />
            </div>
          </div>
          {()=>{
            if (this.props.status !== 'IDLE') {
              return (
                <div className="flex flex-auto">
                  <div className="job-list flex-first col col-5 overflow-y-scroll relative">
                    <JobList actions={actions} jobs={this.props.jobs} index={this.props.index} job={this.props.job} status={this.props.status}/>
                  </div>
                  <div className="flex-last col col-7 overflow-y-scroll border-left relative">
                    <JobDetail actions={actions} jobs={this.props.jobs} job={this.props.job} />
                  </div>
                </div>
              );
            }
          }()}
        </div>
      </div>
    );
  }
}
