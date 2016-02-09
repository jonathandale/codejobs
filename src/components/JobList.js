import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class JobList extends Component {
  static propTypes = {
    actions: PropTypes.object,
    jobs: PropTypes.array,
    job: PropTypes.object,
    status: PropTypes.string,
  };

  nextPage() {
    this.props.actions.searchNextPageAction();
  }

  viewJob(event) {
    event.preventDefault();
    this.props.actions.viewJob(event.target.attributes['data-index'].value);
  }

  render() {
    return (
      <div>
        <ul className="list-reset py1">
          {
              this.props.jobs.map((item, index) => {
                var itemClass = classnames('block px2 py1 border-bottom job-item', this.props.className, {
                  'selected': this.props.job && (this.props.job.url === item.url)
                });

                return (
                  <li key={`JobItem_${index}`}>
                    <a onClick={this.viewJob.bind(this)}
                       href={item.url}
                       className={itemClass}
                       data-index={index}>{item.title}</a>
                  </li>
                );
              })
          }
        </ul>
      </div>
    );
  }
}
