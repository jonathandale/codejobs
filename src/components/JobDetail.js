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
      <div className="px3 py1">
        {
          (() => {
            if(this.props.job) {
              return (
                <div>
                  <h2 className="blue h1 line-height-1">{this.props.job.title}</h2>
                  <div className="flex">
                    <div>
                      <p className="h4 mt0 mb1">{this.props.job.company} | {this.props.job.location}</p>
                      <p className="gray h5 mt1 mb3">{this.props.job.date}</p>
                    </div>
                    <div className="flex-grow right-align ml1">
                      <a href={this.props.job.url}>View job on {this.props.job.provider}</a>
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={this.getDescription()} />
                  <div dangerouslySetInnerHTML={this.getApply()} />
                </div>
              );
            }
            else {
              return (
                <p style={{top: '50%'}}
                   className="absolute right-0 left-0 center caps silver">No Job Selected</p>
              )
            }
          })()
        }
      </div>
    );
  }
}
