import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class JobList extends Component {
  static propTypes = {
    actions: PropTypes.object,
    jobs: PropTypes.array,
    job: PropTypes.object,
    index: PropTypes.number,
    status: PropTypes.string,
  };

  componentDidUpdate(props, state){
    if(props.job) localStorage.setItem(this.slugify(state.job.title), true);
  }

  nextPage() {
    this.props.actions.searchNextPageAction();
  }

  handleKeyDown(event) {
    let idx;

    if(event.which === 38) {
      if(this.props.index > 0) idx = this.props.index - 1;
    }
    else if(event.which === 40) {
      if(this.props.index < this.props.jobs.length) idx = this.props.index + 1;
    }

    if(typeof idx === 'number') this.props.actions.viewJob(idx);
  }

  viewJob(event) {
    event.preventDefault();
    this.props.actions.viewJob(Number(event.target.attributes['data-index'].value));
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
        <ul onKeyDown={this.handleKeyDown.bind(this)} className="list-reset m0">
          {
              this.props.jobs.map((item, index) => {
                var isSelected = this.props.job && (this.props.job.url === item.url),
                    itemClass = classnames('red monospace h3 block px2 py1 m0 border-bottom job-item', this.props.className, {
                      'selected': isSelected,
                      'visited': localStorage.getItem(this.slugify(item.title)) && !isSelected
                  });

                return (
                  <li key={`JobItem_${index}`}>
                    <a onClick={this.viewJob.bind(this)}
                       href={item.url}
                       className={itemClass}
                       data-index={index}
                       data-title={item.title}>
                      <span>{item.title}</span>
                      <span className="clearfix">
                        <span className="left h6 block gray">{item.company}</span>
                        <span className="right h6 block gray">{item.relative_date}</span>
                      </span>
                    </a>
                  </li>
                );
              })
          }
        </ul>
      </div>
    );
  }
}
