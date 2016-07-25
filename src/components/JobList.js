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

  componentDidUpdate(){
    if(this.props.job) localStorage.setItem(this.slugify(this.props.job.title), true);
  }

  isItemInView(idx, direction){
    let el = document.querySelector('a[data-index="' + idx +'"]'),
        viewHeight = window.innerHeight,
        itemHeight = el.offsetHeight,
        controlHeight = document.querySelector('.control-bar').offsetHeight,
        jobList = document.querySelector('.job-list'),
        itemBottom = ((el.offsetTop + el.offsetHeight) - jobList.scrollTop),
        hiddenAmount = itemBottom - viewHeight,
        topInView = (el.offsetTop - controlHeight);

    if(direction === 'down' && (hiddenAmount > 0)) {
      jobList.scrollTop += (hiddenAmount - 1);
    }
    else if (direction === 'up' && (jobList.scrollTop > topInView)) {
      jobList.scrollTop = topInView;
    }
  }

  handleKeyDown(event) {
    let idx, direction;
    event.preventDefault();

    if(event.which === 38) {
      if(this.props.index > 0) {
        idx = this.props.index - 1;
        direction = 'up';
      }
    }
    else if(event.which === 40) {
      if((this.props.index + 1) < this.props.jobs.length) {
        idx = this.props.index + 1;
        direction = 'down';
      }
    }

    if(typeof idx === 'number') {
      this.props.actions.viewJob(idx);
      this.isItemInView(idx, direction);
    }
  }

  viewJob(event) {
    let idx = Number(event.currentTarget.attributes['data-index'].value);
    event.preventDefault();
    this.props.actions.viewJob(idx);
    this.isItemInView(idx);
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
                    itemClass = classnames('relative blue monospace h3 block p2 m0 border-bottom job-item', this.props.className, {
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
                      <div className="flex flex-center">
                        <div>
                          <p className="line-height-1 m0">{item.title}</p>
                          <p className="h6 block gray m0">{item.company}</p>
                        </div>
                        <div className="flex-grow right-align ml1">
                          <p className="h6 block black m0">{item.location}</p>
                          <p className="h6 block gray m0">{item.relative_date}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })
          }
        </ul>
        {
          (() => {
            if(!this.props.jobs.length) {
              return (<div className="loader"></div>)
            }
          })()
        }
      </div>
    );
  }
}
