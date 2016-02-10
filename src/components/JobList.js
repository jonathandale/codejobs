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
    localStorage.setItem(this.slugify(event.target.text), true)
    this.props.actions.viewJob(event.target.attributes['data-index'].value);
  }

  //Should put in some util file or use underscore
  slugify(str) {
    return str.toLowerCase()
              .trim()
              .replace(/\s+/g, '-')
              .replace(/[^\w\-]+/g, '')
              .replace(/\-\-+/g, '-');
  }

  render() {
    return (
      <div>
        <ul className="list-reset m0">
          {
              this.props.jobs.map((item, index) => {
                var isSelected = this.props.job && (this.props.job.url === item.url),
                    itemClass = classnames('block px2 py1 m0 border-bottom job-item', this.props.className, {
                      'selected': isSelected,
                      'visited': localStorage.getItem(this.slugify(item.title)) && !isSelected
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
