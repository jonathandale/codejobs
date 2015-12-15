import React, { Component, PropTypes } from 'react';

export default class JobList extends Component {
  static propTypes = {
    actions: PropTypes.object,
    jobs: PropTypes.array,
    status: PropTypes.string,
  };

  nextPage() {
    this.props.actions.searchNextPageAction();
  }

  render() {
    return (
      <div>
        <div className="row">
          {
              this.props.jobs.map((item, index) => {
                return (
                  <div className="col-md-3 image-item" key={`JobItem_${item.id}_${index}`}>
                    <a href={item.url}>{item.title}</a>
                  </div>
                );
              })
          }
          <div className="clearfix" />
        </div>

        {
          (() => {
            if (this.props.status === 'DONE') {
              return (
                <div style={{marginBottom: '20px'}} className="row">
                  <div className="col-md-6 col-md-offset-3">
                    <button onClick={this.nextPage.bind(this)} type="button" className="btn btn-default btn-lg btn-block">Load More</button>
                  </div>
                </div>
              );
            }
          })()
        }
      </div>
    );
  }
}
