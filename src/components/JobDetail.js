import React, { Component, PropTypes } from 'react';

export default class JobDetail extends Component {
  static propTypes = {
    actions: PropTypes.object,
    job: PropTypes.object,
  };

  getDescription(){
    return {__html: this.props.job.description};
  }

  getApply(){
    var buildUrl = function(url){
      return '<a href="' + url + '" target="_blank">View job on Stack Overflow</a>';
    };
    return {__html: (this.props.job.apply) ? this.props.job.apply : buildUrl(this.props.job.url)};
  }

  render() {
    return (
      <div>
        {
          (() => {
            if(this.props.job) {
              return (
                <div>
                  <h2>{this.props.job.title}</h2>
                  <div dangerouslySetInnerHTML={this.getDescription()} />
                  <div dangerouslySetInnerHTML={this.getApply()} />
                </div>
              );
            }
          })()
        }
      </div>
    );
  }
}
